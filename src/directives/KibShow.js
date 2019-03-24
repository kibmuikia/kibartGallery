export default {
  /* eslint-disable no-console */
  inserted: el => {
    console.log("Just inserted!!");
    console.log(el);
    function loader() {
      console.log(`loader running on ${el.id}`);
    } //end-loader

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          loader();
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
      loader();
    } else {
      createObserver();
    }
  } //end-inserted
}; //end-export
