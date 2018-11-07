import Vue from 'vue';
import { should, expect } from 'chai';
// import Hello from 'src/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    // const vm = new Vue({
    //   template: '<div><hello></hello></div>',
    //   components: { Hello }
    // }).$mount()
    const vm = new Vue({
      template: '<div><div class="hello"><h1>Hello World!</h1></div></div>',
    }).$mount()
    expect(vm.$el.querySelector('.hello h1').textContent).to.contain('Hello World!')
  })
})
