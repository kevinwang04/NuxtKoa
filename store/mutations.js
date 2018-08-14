export default {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_GITHUB_TOKEN(state, token){
    state.githubToken = token
  },
  SET_USER(state, data) {
    state.user = data.data
  },
  SET_ARTICLES(state, data) {
    state.articles = data.data
    state.total = data.total
  },
  SET_TAGS(state, data) {
    state.tags = data.data
  },
  SET_TAG_ARTICLES(state, data) {
    state.tagArticles = data.data
  },
  SET_ARCHVES(state, data) {
    state.archives = data.data
  },
  SET_SEARCH(state, data) {
    state.searchArticles = data.data
  },
  TOGGLE_DARK(state, data) {
    state.isDark = data
  }
}
