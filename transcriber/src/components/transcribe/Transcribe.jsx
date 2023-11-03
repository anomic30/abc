import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Select, Option, Input,
  Checkbox,
  Progress
} from "@material-tailwind/react";

import {
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  ArrowDownTrayIcon
} from "@heroicons/react/24/solid";

import UploadIcon from "../../assets/uploadIcon.svg"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { downloadFile } from "../../utils/downloader.js";

const allowedFileTypes = ["mp3", "mp4", "wav", "caf", "aiff", "avi", "rmvb", "flv", "m4a", "mov", "wmv", "wma"];

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Transcribe = ({ handleOpen, open, setTableData, tableData }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ started: false, completion: 0 });
  const [transcription, setTranscription] = useState("");
  const [option, setOption] = useState("Default");
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    console.log(option);
    if (!file && !url) {
      console.log("No file selected");
      toast.error("Please select a file first!", {
        className: 'text-sm text-black font-semibold',
      });
      return;
    }

    if(file){
      await fileUpload();
      return;
    }

    if(url && !file){
      toast.error("Youtube/Google Drive link support coming soon! Stay tuned :)", {
        className: 'text-sm text-black font-semibold',
      });
      return;
    }

    // if(url && file){
    //   toast.error("You cannot upload both!", {
    //     className: 'text-sm text-black font-semibold',
    //   });
    //   return;
    // }
  }

  const ytUpload = async()=>{
    try {
      setLoading(true);
      const resp = await axios.post(APP_SERVER + "/api/transcribe/youtube", {
        url: url,
        language: option
      });
      setLoading(false);
      console.log(resp.data);
      // setTableData([...tableData, resp.data]);
      // setTranscription(resp.data.fileTranscription);
    } catch (error) {
      setLoading(false);
      setProgress({ started: false, completion: 0 });
      console.log(error);
      toast.error("Something went wrong!", {
        className: 'text-sm text-black font-semibold',
      });
    }
  }

  const fileUpload = async()=>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", option);

    try {
      setLoading(true);
      const resp = await axios.post(APP_SERVER + "/api/transcribe/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const completion = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress({ started: true, completion });
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      toast.success("File transcribed successfully!", {
        className: 'text-sm text-black font-semibold',
      });
      setTableData([...tableData, resp.data]);
      setTranscription(resp.data.fileTranscription);
    } catch (error) {
      setLoading(false);
      setProgress({ started: false, completion: 0 });
      console.log(error);
      toast.error("Something went wrong!", {
        className: 'text-sm text-black font-semibold',
      });
    }
  }

  const handleFileSelection = (e) => {
    setProgress({ started: false, completion: 0 });
    const droppedFile = e.target.files[0];
    if (droppedFile) {
      const fileType = droppedFile.name.split('.').pop().toLowerCase();
      if (!allowedFileTypes.includes(fileType)) {
        toast.error("Please select a valid file type!", {
          className: 'text-sm text-black font-semibold',
        });
        return;
      }

      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    // setProgress({ started: false, completion: 0 });
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setProgress({ started: false, completion: 0 });

    const droppedFile = e.dataTransfer.files[0];
    
    if (droppedFile) {
      const fileType = droppedFile.name.split('.').pop().toLowerCase();
      
      if (!allowedFileTypes.includes(fileType)) {
        toast.error("Please select a valid file type!", {
          className: 'text-sm text-black font-semibold',
        });
        return;
      }

      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  }

  return (
    <Dialog open={open} handler={handleOpen} className="p-5">
      <div><Toaster/></div>
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="black">
          Transcribe File
        </Typography>
        <IconButton className="bg-transparent" onClick={handleOpen}>
          <XMarkIcon className="h-5 w-5 stroke-black" />
        </IconButton>
      </DialogHeader>

      <DialogBody className="">
        <Typography variant="paragraph" color="black" className="text-xs font-semibold my-2">
          Transcription Language
        </Typography>
        <Select variant="outlined" value={option} onChange={(e) => setOption(e)}>
          <Option value="Default">Default</Option>
          <Option value="English">English</Option>
          <Option value="Hindi">Hindi</Option>
          <Option value="Bengali">Bengali</Option>
          <Option value="Bengali">Spanish</Option>
          <Option value="Bengali">Russian</Option>
        </Select>

        <div className="flex items-center justify-center w-full my-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="rounded-full bg-blue-50 p-2 mb-4">
                <img src={UploadIcon} alt="upload" className="w-6 h-6 stroke-appBlue" />
              </div>
              <Typography variant="paragraph" className="mb-2 text-sm text-gray-900">
                <span className="font-semibold text-appBlue">Click to upload</span> or drag and drop
              </Typography>
              <Typography variant="paragraph" color="black" className="text-xs text-gray-500">
                The maximum file size is 1GB for audio and 10GB for videos.
              </Typography>
              <Typography variant="paragraph" color="black" className="text-xs text-gray-500">
                Supported formats: mp3, mp4, wav, caf, aiff, avi, rmvb, flv, m4a, mov, wmv, wma
              </Typography>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={(e) => { handleFileSelection(e) }} disabled={loading}/>
            
            {progress.started ? <>
              <Progress color={progress.completion == 100 ? "green" : "blue"} value={progress.completion} className="w-[80%]" />
              <div className="mt-2">
                {loading ? progress.completion != 100 ? "Uploading..." : "Transcribing..." :
                  <Button onClick={() => downloadFile(transcription, fileName)} className="normal-case text-sm text-appBlue border-appBlue flex items-center gap-4" variant="outlined" size="sm">
                    <ArrowDownTrayIcon className="w-5 h-5"/>
                    Download Transcription
                  </Button>
                }
              </div>
            </> : (
              <>
                {file && <><Typography variant="paragraph" color="black" className="text-xs text-gray-500">
                  File preview:
                </Typography>
                <Typography variant="paragraph" color="black" className="text-sm font-semibold pt-1 text-center">
                  {fileName}
                  </Typography>
                </>}
              </>
            )}
          </label>
        </div>

        <Typography variant="paragraph" color="black" className="text-xs font-semibold my-2">
          Imported from Link
        </Typography>
        <Input variant="outlined" placeholder="Paste a Dropbox, Google Cloud or Youtube URL here" onChange={(e)=>setUrl(e.target.value)}></Input>

        <section className="flex items-center mt-2">
          <Checkbox className="hover:before:opacity-0" containerProps={{ className: "px-0"}} ripple={false} color="blue"/>
          <Typography variant="paragraph" color="black" className="text-sm font-semibold mx-2">
            Speaker identification
          </Typography>
        </section>

      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button className="w-full normal-case text-sm bg-appBlue" onClick={handleUpload} disabled={loading}>
          { loading? progress.completion != 100? "Uploading..." : "Transcribing..." : "Transcribe"}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default Transcribe