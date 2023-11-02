import { Button, Card, Typography } from "@material-tailwind/react"
import NavbarSimple from "../../components/navbar/Navbar.jsx"
import {
  BookmarkIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import TextIcon from "../../assets/textIcon.svg"
import Table from "../../components/table/Table.jsx";
import Transcribe from "../../components/transcribe/Transcribe.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Home = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
 
  const fetchTranscriptions = async () => {
    try {
      const result = await axios.get(APP_SERVER + "/api/transcribe/all");
      console.log(result.data);
      setTableData(result.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const handleOpen = () => setOpen(!open);
  return (
    <div className="w-screen h-full bg-appWhite">
    
      <NavbarSimple />
      <section className="flex justify-between items-center px-4 mt-4">
        <div>
          <Typography variant="h1" className="text-2xl text-black" textGradient>
            Welcome Anom
          </Typography>
          <Typography variant="paragraph" className="text-sm text-black mt-2" >
            Upload your Audio & Video to convert it into text
          </Typography>
        </div>
        <div>
          <Button className="bg-appBlue normal-case text-sm" onClick={handleOpen} >Transcribe</Button>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-4 px-4 mt-8 w-full">
        <Card className="flex-1 p-4 flex">
          <div className="p-2 border rounded-full w-fit">
            <FolderIcon className="w-5 h-5 stroke-black"/>
          </div>
          <Typography variant="h2" className="text-lg text-black mt-4" >
            100
          </Typography>
          <Typography variant="paragraph" className="text-sm text-black mt-2" >
            Uploaded Files
          </Typography>
        </Card>
        <Card className="flex-1 p-4">
          <div className="p-2 border rounded-full w-fit">
            <img src={TextIcon} alt="text" className="w-5 h-5"/>
          </div>
          <Typography variant="h2" className="text-lg text-black mt-4" >
            50
          </Typography>
          <Typography variant="paragraph" className="text-sm text-black mt-2" >
            Transcribed
          </Typography>
        </Card>
        <Card className="flex-1 p-4">
          <div className="p-2 border rounded-full w-fit">
            <BookmarkIcon className="w-5 h-5 stroke-black"/>
          </div>
          <Typography variant="h2" className="text-lg text-black mt-4" >
            20
          </Typography>
          <Typography variant="paragraph" className="text-sm text-black mt-2" >
            Saved
          </Typography>
        </Card>
      </section>
      <Card className="my-4 mx-4 p-4">
        <Typography variant="h2" className="text-lg text-black my-4" >
            Recent Files
        </Typography>
        <hr className="w-full mb-4"/>
          
        <Table setTableData={setTableData } tableData={tableData} />
      </Card>
      <Transcribe handleOpen={handleOpen} open={open} setTableData={setTableData} tableData={tableData} />
    </div>
  )
}

export default Home