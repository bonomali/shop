export const state = () => ({
  allowed_ids: []
})

export const mutations = {
  add: (state, id) => state.allowed_ids.push(id)
}
