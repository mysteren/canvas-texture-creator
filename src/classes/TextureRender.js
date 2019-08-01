import CustomMath from "./CustomMath";

export default class TextureRender {
    constructor(canvas, laying, size, cropMethod) {

      this.canvas = canvas;
      this.laying = laying;
      this.size = size;
      this.cropMethod = cropMethod;

      this.images = [];
      this.imageIndex = 0;
      this.imagesList = [0];

      this.heightPointIndex = 0;
      this.heightPointsList = [0];
      
    }


    /* render(file) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const reader = new FileReader();

      canvas.height = 320;
      canvas.width = 320;

      reader.readAsDataURL(file);
      reader.onload = () => {
        img.src = reader.result;
        img.onload = () => {
          const realImgWidth = img.width;
          const realImgHeight = img.height;
          img.width = 40;
          for (let i = 0; i <= canvas.width; i += img.width) {
            let j = this.getRandomArbitrary(0, -img.height);
            for (; j <= canvas.height;) {
              const k = this.getRandomArbitrary(0.3, 1);
              const elRealHeight = k * realImgHeight;
              const elHeight = elRealHeight * img.width / realImgWidth;
              ctx.drawImage(img, 0, 1, realImgWidth, elRealHeight, i, j, img.width, elHeight);
              j += elHeight;
            }
          }
        };
      };
    }, */

    /**
     * 
     * @param {*} firstImage 
     */
    correctCanvas(firstImage) {

      this.canvas.height = firstImage.height * this.size;
      this.canvas.width = this.canvas.height;

      // console.log([this.canvas.width, this.canvas.height]);

      /**
       * @todo возможно не нужно,  более точно подстраивает  размер canvas
       */
      /* if (this.cropMethod === 'autocorrection') {
        
        firstImage = this.imageCorrect(firstImage);

        this.canvas.height = firstImage.height *  this.size;
        this.canvas.width = this.canvas.height;

      } */

      // console.log([this.canvas.width, this.canvas.height]);

    }

    /**
     * Инициализация изображений
     * @param {Array} images 
     */
    setImages(images) {
      console.log()
      let data = Object.assign([], images); 
      if (data.length) {
        return this.addImages(data);
      }
      return this;
    }

    /**
     * 
     * @param {Image} image 
     */
    imageCorrect(image) {

      if (this.cropMethod === 'autocorrection') {

        console.log([this.heightPointsList.length, (this.canvas.width / image.width) / this.heightPointsList.length]);

        let wRatio =  Math.round((this.canvas.width / image.width) / this.heightPointsList.length) * this.heightPointsList.length,
          hRatio = Math.round(this.canvas.height / image.height);

        image.width = Math.round(this.canvas.width / wRatio);
        image.height = Math.round(this.canvas.height / hRatio);

      }

      return image;

    }

    /**
     * Обход списка изображений
     */
    getImage() {
      /* console.log(this.images);
      console.log(this.imagesList);
      console.log(this.imageIndex); */
      let image = this.images[this.imagesList[this.imageIndex]];

      if (++this.imageIndex >= this.imagesList.length) {
        this.imageIndex = 0;
      }

      return image;

    }

    /**
     * Обход списка смещений
     */
    getStartHeightPoint(height) {

      //console.log(this.heightPointsList);
      let ratio = this.heightPointsList[this.heightPointIndex];
      
      if (++this.heightPointIndex >= this.heightPointsList.length) {
        this.heightPointIndex = 0;
      }

      if (ratio !== 0) {
        ratio += CustomMath.randomArbitrary(-0.03, 0.03);
      }

      return ratio * height;

    }

    /**
     * 
     */
    setHeightPointsList()
    {
      if (this.laying === 'offset') {

        if (this.size === 1 && this.images.length < 5) {
          return [0, -0.67,-0.33,-0.5,];
        } else if (this.size === 1 && this.images.length === 5) {
          return [0, -0.67,-0.33,-0.5,-0.67];
        } else if (this.size === 1) {
          return [0, -0.67,-0.33,-0.5,-0.67];
        }

      } else if (this.laying === 'straight') {
        
      }
      return Array(this.images.length).fill(0);
    }

    setImagesList() {
      if (this.laying === 'offset') {
        if (this.size === 1 && this.images.length === 2) {
          return [0,1,1,0,0,1,1];
        } else if (this.size === 1 && this.images.length === 3) {
          return [0,1,1,2,2,0,0,1,2,2,0,0,1,1];
        } else if (this.size === 1 && this.images.length === 4) {
          return [0,1,1,2,2,3,3];
        } else if (this.size === 1 && this.images.length === 5) {
          return [0,1,1,2,2,3,3,4,4];
        }
      }

      return [...this.images.keys()];
    }
    
    /**
     * Отрисовка
     * @param {Array} images 
     */
    draw(images) {
      
      this.images = [];

      images.forEach(image => {
        
        let img = new Image();

        img.src = image.src;

        img.onload = () => {
          this.images.push(img);
          if (images.length === this.images.length) {
            this.render()
          }
        }
      });
    }

    /**
     * Рендеринг после загрузки всех  изображений
     */
    render() {

      let ctx = this.canvas.getContext('2d');

      if (this.images.length) {

        let firstImage = this.images[0];

        
        this.heightPointsList = this.setHeightPointsList();
        this.imagesList = this.setImagesList()

        this.correctCanvas(firstImage);
        
        console.log([this.canvas.width, this.canvas.height]);

        let wPoint = 0;
        while(wPoint < this.canvas.width) {
          let hPoint = this.getStartHeightPoint(firstImage.height);
          while (hPoint < this.canvas.height) {
            let img = this.imageCorrect(this.getImage());

            ctx.drawImage(img, wPoint, hPoint, img.width, img.height); 
            //ctx.drawImage(img, 0, 0, img.width, img.height, wPoint, hPoint, img.width, img.height); 
            hPoint += img.height;
          };
          wPoint += firstImage.width
        }
      }
    };
};