export default {
  /* eslint-disable no-console */
  inserted: el => {
    function loadImage() {
      // console.log(Array.from(el.children));
      // if (el.children[1].className == "v-image") {
      //   let imageEl = el => el.children[1].className == "v-image";
      //   console.log(imageEl);
      // }
      // try {
      // let imageEl = Array.from(el.children).find(el => el.classList);
      // const imageEl = el => el.children[1];
      // console.log(imageEl);
      // } catch (e) {
      // console.error(e);
      // }
      const imageElement = Array.from(el.children).find(
        el => el.nodeName === "IMG"
        // el => el.className === "v-image"
      );
      // console.log(imageElement);

      if (imageElement) {
        imageElement.addEventListener("load", () => {
          setTimeout(() => el.classList.add("loaded"), 100);
        });
        imageElement.addEventListener("error", () => console.log("error"));
        imageElement.src = imageElement.dataset.url;
      }
    } //end-loadImage()

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          loadImage();
          observer.unobserve(el);
        }
      });
    } //end-handleIntersect()

    function createObserver() {
      const options = {
        // circumstances under which the observer's callback is invoked
        root: null, // defaults to the browser viewport if not specified or if null
        threshold: "0" // the degree of intersection between the target element and its root (0 - 1)
        // threshold of 1.0 means that when 100% of the target is visible within
        //the element specified by the root option, the callback is invoked
      };

      // Whether you're using the viewport or some other element as the root,the API works the same way,
      // executing a callback function you provide whenever the visibility of the target element changes
      // so that it crosses desired amounts of intersection with the root

      const observer = new IntersectionObserver(handleIntersect, options);

      observer.observe(el); // target element to watch
    } //end-createObserver()

    if (!window["IntersectionObserver"]) {
      loadImage();
    } else {
      createObserver();
    }
  } //end-inserted
};
