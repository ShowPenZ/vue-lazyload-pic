<script type="text/babel">
import ClassNames from 'classnames';
import 'intersection-observer';

const PicLazyLoad = {
  name: 'PicLazyLoad',
  props: {
    imgLoaded: {
      type: Boolean,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    imgClassName: {
      type: String,
      required: false,
    },
    skeleton: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  render() {
    const that = this;
    const { imgLoaded, imgClassName, img, alt, skeleton } = that;
    const onLoad = () => {
      that.$emit('onloads', true);
    };

    return (
      <div class="P-container">
        {imgLoaded ? (
          <img class={ClassNames('defaultImg', imgClassName)} src={img} alt={alt} />
        ) : (
          <div class={ClassNames('skeleton1', skeleton)}></div>
        )}
        <img class="noShow" src={img} alt={alt} onLoad={onLoad} />
      </div>
    );
  },
};

const LazyLoadPic = {
  name: 'LazyLoadPic',
  props: {
    imgClassName: {
      type: String,
      required: false,
    },
    imgArr: {
      type: Array,
      required: true,
    },
    imgBoxClassName: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      imgBlob: [],
      refs: [],
    };
  },
  methods: {
    getBase64(imgUrl, callback) {
      let xhr = new XMLHttpRequest();

      xhr.open('get', imgUrl, true);
      xhr.responseType = 'blob';

      xhr.onload = e => {
        if (e.target.status === 200) {
          const blob = e.target.response;
          const oFileReader = new FileReader();

          oFileReader.onloadend = e => {
            callback(e.target.result);
          };

          oFileReader.readAsDataURL(blob);
        }
      };

      xhr.send();
    },

    callback(e) {
      const that = this;
      const { imgBlob } = that;

      that.imgBlob = imgBlob.concat(e);
    },

    onload(refs) {
      const that = this;
      const threshold = [0.02];

      const io = new IntersectionObserver(
        entries => {
          entries.forEach(i => {
            const { target } = i;

            if (i.intersectionRatio <= 0) {
              return null;
            }

            that.getBase64(target.dataset.src, that.callback);

            io.unobserve(target);
          });
        },
        {
          threshold,
        }
      );

      refs.map(i => {
        return io.observe(i);
      });
    },
  },

  render() {
    const that = this;
    const { imgClassName, imgBoxClassName, boxClassName, imgArr, imgBlob } = that;
    const hasData = imgBlob.length > 0;

    let images = [];
    let refs = [];

    imgArr.map((d, i) => {
      that.$nextTick(() => {
        refs.push(that.$refs[`imgRef${i}`]);
      });

      return images.push(
        <div class={ClassNames('defaultImageBox', imgBoxClassName)} key={i}>
          <img
            key={i}
            class={ClassNames(hasData ? '' : 'L-skeleton1', imgClassName)}
            ref={`imgRef${i}`}
            src={hasData ? imgBlob[i] : ''}
            alt={hasData ? d.alt : ''}
            data-src={d.url}
          />
        </div>
      );
    });

    const LazyLoadImg = (
      <div class={ClassNames('box', boxClassName)}>
        {images}
        <img onError={() => that.onload(refs)} src="" />
      </div>
    );

    return <div class="L-container">{LazyLoadImg}</div>;
  },
};

export default { PicLazyLoad, LazyLoadPic };
</script>
<style>
.P-container {
  background: #fff;
}

.skeleton {
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #496eaa, #944fa8, #a8804f, #496eaa);
  background-size: 1400% 300%;
  position: absolute;
  top: 10px;
  left: 10px;
  animation: colorMove 20s ease infinite;
}

.skeleton1 {
  width: 300px;
  height: 200px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: ant-skeleton-loading 1.4s ease infinite;
}

.L-skeleton1 {
  width: 300px;
  height: 200px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: ant-skeleton-loading 1.4s ease infinite;
}

.defaultImg {
  width: 300px;
  height: 200px;
}

.noShow {
  display: none;
}

.L-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.box {
  height: 400px;
  overflow-y: scroll;
}

.defaultImageBox {
  display: flex;
  justify-content: center;
  width: 500px;
  height: 200px;
  margin: 20px auto;
}

@keyframes colorMove {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 100% 0%;
  }
}

@keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
