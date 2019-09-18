import swal from "sweetalert2";

export default {
  showAlert: function(
    title,
    message,
    type,
    timer = 3000,
    hasConfirm = false,
    hasCancel = false,
    confirmBtnText = "Yes",
    cancelBtnText = "Cancel"
  ) {
    // eslint-disable-next-line
    swal
      .fire({
        title: title,
        text: message,
        type: type,
        timer: timer,
        showConfirmButton: hasConfirm,
        showCancelButton: hasCancel,
        confirmButtonText: confirmBtnText,
        cancelButtonText: cancelBtnText
      })
      .then(result => {
        if (result.value) {
          // eslint-disable-next-line
          console.log(result.value);
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        }
      });
  }, // end-showAlert
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  },
  extend(obj, src) {
    Object.keys(src).forEach(function(key) {
      obj[key] = src[key];
    });
    return obj;
  }
};
