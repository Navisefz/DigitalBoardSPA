import React, { useState, useEffect } from "react";
import UploadIcon from "@mui/icons-material/Upload";

const defaultImageSrc = "img/mbgsp.jpg";

const initialFieldValues = {
  imageID: 0,
 
  imageName: "",
  imageKey: null,
  imageSrc: defaultImageSrc,
  imageFile: [],
  floor: 0,
  order:0,
  content :"",
};
// const initialFieldValues1 = {
//   imageID: 0,
 
//   imageName: "",
//   imageKey: null,
//   imageSrc: defaultImageSrc,
//   imageFile: [],
//   floor: 0,
//   order:0,
// };

export default function ImageUpload(props) {
  const { addOrEdit, recordForEdit } = props;
  const { addOrEdit1, recordForEdit1 } = props;

  // console.log(props.remarks);

  const [values, setValues] = useState(initialFieldValues);
  // const [values1, setValues1] = useState(initialFieldValues1);
  const [errors, setErrors] = useState({});
  


  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);
  useEffect(() => {
    if (recordForEdit1 != null) setValues(recordForEdit1);
  }, [recordForEdit1]);

  const showPreview = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
     
          imageFile: e.target.files,
          imageSrc: URL.createObjectURL(e.target.files[0]),
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setValues({
        ...values,
        imageFile: [],
        imageSrc: defaultImageSrc,
      });
    }
  };
  // const showPreview1= (event) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = (x) => {
  //       setValues1({
  //         ...values1,
     
  //         imageFile: event.target.files,
  //         imageSrc: URL.createObjectURL(event.target.files[0]),
  //       });
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   } else {
  //     setValues1({
  //       ...values1,
  //       imageFile: [],
  //       imageSrc: defaultImageSrc,
  //     });
  //   }
  // };
  const validate = () => {
    let temp = {};
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  // const validate1 = () => {
  //   let temp1 = {};
  //   temp1.imageSrc = values1.imageSrc === defaultImageSrc ? false : true;
  //   setErrors(temp1);
  //   return Object.values1(temp1).every((x) => x === true);
  // };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };
  // const resetForm1 = () => {
  //   setValues1(initialFieldValues1);
  //   document.getElementById("image-upload").value = null;
  //   setErrors({});
  // };
   const formsubmit = (e)=>{
    handleFormSubmit(e);
    handleFormSubmit1(e);
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("imageID", values.imageID);
      formData.append("imageKey", values.imageKey);
      formData.append("imageName", values.imageName);
      formData.append("floor", values.floor);
      formData.append("order", values.order);
      formData.append("content", props.remarks);
      for (let i = 0; i < values.imageFile.length; i++) {
        formData.append("files", values.imageFile[i]);
      }
      addOrEdit(formData, resetForm) ;
      // addOrEdit1(formData, resetForm);
    }
  };
 
  const handleFormSubmit1 = (event) => {
    event.preventDefault();
    if (validate()) {
      const formData1 = new FormData();
      formData1.append("imageID", values.imageID);
      formData1.append("imageKey", values.imageKey);
      formData1.append("imageName", values.imageName);
      formData1.append("floor", values.floor);
      formData1.append("order", values.order);
      for (let i = 0; i < values.imageFile.length; i++) {
        formData1.append("files", values.imageFile[i]);
      }
      addOrEdit1(formData1, resetForm);
      
    }
   
  };
 

  const handleClick = (event) => {
    event.currentTarget.classList.toggle("showImage");
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? " invalid-field" : "";

  return (
    <>
      <div className="cards">
        <img
          src={values.imageSrc || values.ImageSrc}
          className="cardTop"
          alt=""
          onClick={handleClick}
        />
      </div>
      <form
        typeof="multipart/form-data"
        type="multipart/form-data"
        autoComplete="off"
        noValidate
        onSubmit={formsubmit}
        // onSubmit={event =>
        //   {
            
           
            
        //       handleFormSubmit1(event);
            
        //    }}
      
      >   
        <div className="UploadImage">
          <div className="fileChoose">
            <input
              type="file"
              accept="image/*"
              className={"form-control-file" + applyErrorClass("imageSrc")}
              onChange={showPreview }
              id={"image-uploader"}
              multiple
            />
          </div>
          <div className="btnupload">
            <button type="submit" className="btn btn-light" onClick={(e) => {}}>
              Upload
              <UploadIcon />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
