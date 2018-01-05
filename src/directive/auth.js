import Vue from 'vue'
const auth = (el, binding, s) => {
  const authlist = s.context.$store.state.user.authlist
  const btnFilter = (_authlist) => {
    const btnObj = _authlist[binding.value.id]
    el.textContent = btnObj.name
    if (btnObj.perms.indexOf(binding.value.p) === -1) {
      el.classList.add('is-disabled')
      el.disabled = true
    }
    // if (_authlist[btnObj.parent_id].perms.indexOf(btnObj.perms) === -1) {
    //   el.classList.add('is-disabled')
    //   el.disabled = true
    // }
  }
  if (!Object.keys(authlist).length) {
    s.context.$store.dispatch('GetRoleList').then((res) => {
      btnFilter(res)
    }).catch(() => {})
  } else {
    btnFilter(authlist)
  }
}

const install = function(Vue) {
  Vue.directive('auth', auth)
}

if (window.Vue) {
  window.auth = auth
  Vue.use(install); // eslint-disable-line
}

auth.install = install
export default auth

