Maya.Store.multikey = {
    name: 'multikey',
    data: {},
    events: {
      onLoad: async ({ key }) => {
        console.log("IN");
        const data = key === 'alpha'
          ? { key, name: 'Alice', role: 'Designer' }
          : { key, name: 'Bob', role: 'Engineer' };
  
        return Maya.Store.SetData({ store: 'multikey', key })(data);
      },
      updateName: async (ev) => {
        const { key, store } = ev;
      
        const name = Maya.Store.multikey.data.self.name;
      
        const existing = Maya.Store.multikey.data[key];
        const updated = { ...existing, name };
      
        return Maya.Store.SetData({ store: 'multikey', key })(updated);
      }
    }
  };
  
  class SampleMFE extends MayaMFE {
    constructor() {
      super();
      this.setStore(Maya.Store.multikey);
      this.setView('main');
    }
  
    onLoad = async (options) => {
      return Maya.Store.multikey.events.onLoad(options);
    };
  
    onRender = async () => {
      Maya.Load('multikey/detail?key=alpha&target=target1');
      Maya.Load('multikey/detail?key=beta&target=target2');
    };
  }
  
  window.customElements.define('albert-multikey', SampleMFE);
  