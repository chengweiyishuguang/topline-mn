<template>
   <div class="search-container">
    <!-- 搜索栏 -->
    <form  class="search-form" action="/">
      <van-search
      background="#3296fa"
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
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
       @click="onSuggestionClick(item)">
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
      searchText: '',
      isResultShow: false,
      suggestions: [], // 联想建议列表
      searchHistories: getItem('search-histories') || []// 搜索历史记录

    }
  },
  methods: {
    onSearch () {
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
    },
    onSuggestionClick (str) {
      // 更新文本数据
      this.searchText = str
      // 展示搜索结果
      this.isResultShow = true
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
