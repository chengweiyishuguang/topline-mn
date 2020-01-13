<template>
   <div class="search-container">
    <!-- 搜索栏 -->
    <form  class="search-form" action="/">
      <van-search
      background="#3296fa"
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow=false"
        @input="onSearchInput"
      />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
      <search-result v-if="isResultShow" :q="searchText"/>
    <!-- /搜获结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
       v-for="(item,index) in suggestions"
      icon="search"
       :key="index"
       @click="onSearch(item)">
       <div slot="title" v-html="highlight(item)"></div>
      </van-cell>

    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录"
      >
        <van-icon name="delete"></van-icon>
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </van-cell>
      <van-cell :title="item"
        v-for="(item,index) in searchHistories"
        :key="index"
        @click="onSearch(item)"
      >
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>

</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'
import { getItem, setItem } from '@/untils/storage'

export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索内容
      isResultShow: false, // 搜索结果的显示状态
      suggestions: [], // 联想建议列表
      searchHistories: getItem('search-histories') || []// 搜索历史记录

    }
  },
  methods: {
    onSearch (q) {
      // q:文本框数据本身，联想建议文本，历史记录文本
      // 1.修改搜索框的文本内容
      this.searchText = q
      // 记录搜索历史记录
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)
      this.isResultShow = true
    },
    async onSearchInput () {
      const searchText = this.searchText
      if (!searchText) {
        return
      }
      const { data } = await getSuggestions(searchText)
      this.suggestions = data.data.options
    },
    highlight (str) {
      return str.toLowerCase().replace(this.searchText.toLowerCase(),
        `<span style="color:red">${this.searchText}</span>`)
    }
  },
  watch: {
    searchHistories (newVal) {
      setItem('search-histories', newVal)
    }
  }

}
</script>

<style scoped lang="less">
.search-container {
  padding-top:54px;
  .search-form {
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index:1;
  }
  .van-search__action {
    color:#fff;
  }
}

</style>
