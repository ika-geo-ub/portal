export const state = () => ({ 
    userData: null
});
  
export const mutations = {
    set(state, { item, value }) {
        state[item] = value;
    },
    toggle(state, { item }) {
        state[item] = !state[item];
    }
};