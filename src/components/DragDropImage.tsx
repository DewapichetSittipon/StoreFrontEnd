import { useRef, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { FaCloudArrowUp } from 'react-icons/fa6';
import { convertFileToBase64 } from "../utils";

interface Props {
  onSelect: (file: File) => void;
}

export function DragDropImage(props: Props) {
  const [imagePreview, setImagePreview] = useState("");
  const size = 10 * (1024 * 1024);
  const file = useRef({} as HTMLInputElement);

  const dragover = (event: any) => {
    event.preventDefault();
  };

  const drop = (event: any) => {
    event.preventDefault();

    const files = event.dataTransfer?.files as FileList;

    if (files.length > 1 || files[0].size > size) return;

    addImagePreview(files[0]);
  };

  const onUploadImage = () => {
    file.current.click();
  };

  const onChangeFileImageSelected = (event: HTMLInputElement) => {
    const fileUpload: File = event.files![0];

    if (!fileUpload || fileUpload.size > size) return;

    addImagePreview(fileUpload);
  };

  const addImagePreview = async (file: File) => {
    const imageBase64 = await convertFileToBase64(file);

    setImagePreview(imageBase64 as string);

    props.onSelect(file);
  };

  return (
    <>
      <Card
        className="cursor-pointer d-flex flex-column justify-content-center align-items-center h-100"
        onDragOver={dragover}
        onDrop={drop}
        onClick={onUploadImage}
      >
        {!imagePreview ? <div>
          <div className="text-center font-weight-bold">
            <FaCloudArrowUp />
            <p><span className="text-primary">Click to up </span>or drag and drop</p>
            <p>JPEG, JPG, or PNG (Max 10 MB)</p>
          </div>
        </div>
          : <>
            <div className="img-preview">
              <Image src={imagePreview} className="img-preview" />
            </div>
          </>}
        <input ref={file} type="file" id="assetsFieldHandle" className="w-px h-px opacity-0 overflow-hidden absolute d-none"
          accept=".pdf,.jpg,.jpeg,.png" onInput={(event) => onChangeFileImageSelected(event.target as HTMLInputElement)} />
      </Card >
    </>
  );
}