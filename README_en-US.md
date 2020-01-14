English | [中文](./README.md)

# vue-lazyload-pic

> A lazyload-pic component for Vue

## Installation

```
$ npm install vue-lazyload-pic --save
$ yarn add vue-lazyload-pic
```

## Usage
Method 1: Display after full loading only for the large picture to be displayed currently, and replace the picture with occupation bitmap when it is not fully loaded

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

    // loaded callback
    const onLoads = arg => {
      that.imgLoaded = arg;
      //it means that image was loaded
      // do you want to do 
    };

    return (
      <div class="container">
        <LazyLoad.PicLazyLoad
          img={Sevn} // images
          skeleton="newSkeleton" // Bitmap CSS Style(className)
          imgClassName="sevn" // img className 
          alt="sevn"
          imgLoaded={imgLoaded}
          {...{ on: { onloads: onLoads } }} //Monitor image loading
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
Method 2: Lazy loading of picture list, when the picture is loaded, it will be displayed in the list

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
