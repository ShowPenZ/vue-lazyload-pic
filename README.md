[English](https://github.com/ShowPenZ/vue-lazyload-pic/blob/master/README_en-US.md) | 中文

# vue-lazyload-pic

> A lazyload-pic component for Vue

## Installation

```
$ npm install vue-lazyload-pic --save
$ yarn add vue-lazyload-pic
```

## Usage
方法1 仅针对当前所要展示的大图做完全加载后展示，未完全加载时图片用占位图替代

``` vue
<script type="text/jsx">
import LazyLoad from "../components/picLazyload";
import Sevn from "../assets/sven.jpg";

export default {
  name: "app",
  data() {
    return {
      imgLoaded: false
    };
  },
  methods: {},
  render() {
    const that = this;
    const { imgLoaded } = that;

    // 图片载入完成的回掉
    const onLoads = arg => {
      that.imgLoaded = arg;
      // 可在这个函数内执行图片加载完成后的操作
    };

    return (
      <div class="container">
        <LazyLoad.PicLazyLoad
          img={Sevn} // 图片
          skeleton="newSkeleton" // 占位图css样式(className)
          imgClassName="sevn" // 图片的样式(className)
          alt="sevn"
          imgLoaded={imgLoaded}
          {...{ on: { onloads: onLoads } }} //监听图片加载
        />
      </div>
    );
  }
};
</script>

<style>
.container {
  box-sizing: border-box;
  padding-top: 200px;
  height: 100vh;
}
.imgClassName {
  width: 200px;
  height: 200px;
}
.P-container {
  display: flex;
  justify-content: center;
}
</style>

```
方法2 懒加载图片列表，当图片加载才会被显示在列表内

``` vue
<script type="text/babel">
import LazyLoad from "../components/picLazyload";
import _ from "lodash";

export default {
  name: "app",
  methods: {},
  mounted() {
    const that = this;
    let arr = [];

    for (let i = 1; i < 17; i++) {
      arr.push({ url: require(`../img/${i}.png`) });
    }

    that.imgArr = _.concat(arr);
  },
  data() {
    return {
      testImgArr: [
        { url: require("../assets/bg.png"), alt: "1" },
        { url: require("../assets/sven.jpg"), alt: "2" },
        { url: require("../assets/WechatIMG2.jpeg"), alt: "3" },
        { url: require("../assets/WechatIMG2.png"), alt: "4" },
        { url: require("../assets/WechatIMG3.png"), alt: "5" }
      ]
    };
  },
  render() {
    const that = this;
    const { testImgArr } = that;

    return (
      <div class="container">
        <LazyLoad.LazyLoadPic imgArr={testImgArr} imgClassName="imgClassName" />
      </div>
    );
  }
};
</script>
<style>
.container {
  box-sizing: border-box;
  padding-top: 200px;
  height: 100vh;
}
.imgClassName {
  width: 200px;
  height: 200px;
}
.P-container {
  display: flex;
  justify-content: center;
}
</style>
```
# License

MIT
