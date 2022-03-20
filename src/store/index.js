import { createStore } from 'vuex'
import home from "./home"
import login from "./login"

export default createStore({
  modules: {
    login,
    home
  }
})
