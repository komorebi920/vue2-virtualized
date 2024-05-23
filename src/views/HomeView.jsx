import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  render() {
    return (
      <div class="home">
        <img alt="Vue logo" src={require("@/assets/logo.png")} />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
      </div>
    );
  }
}
