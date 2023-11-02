import { Card, Checkbox, Typography, Tooltip, Button, IconButton } from "@material-tailwind/react";
import axios from "axios";
import { downloadFile } from "../../utils/downloader.js";
import dayjs from "dayjs";

import {
  XMarkIcon,
  TrashIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";
 
const TABLE_HEAD = ["", "Name", "Type", "Duration", "Date Created", "Last Updated", "Actions"];

const APP_SERVER = import.meta.env.VITE_APP_SERVER;
 
const Table = ({ setTableData, tableData }) => {

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(APP_SERVER + "/api/transcribe/" + id);
      console.log(resp.data);
      setTableData(tableData.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }
  return (
    <Card className="p-0 m-0 rounded-none overflow-y-scroll max-h-[calc(100vh-27rem)]">
      <table className="w-full min-w-max table-auto text-left overflow-scroll max-h-[calc(100vh-40rem)]">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-blue-gray-100 bg-blue-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {tableData.length > 0 && tableData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) => {
          const isLast = index === tableData.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={item._id}>
              <td className={classes}>
                <Checkbox color="gray"/>
              </td>
              <td className={classes}>
                <Tooltip content={item.fileName} placement="top-start" className="border text-black border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal max-w-[10rem] overflow-hidden"
                  >
                  {item.fileName}
                  </Typography>
                </Tooltip>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.fileType}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.fileDuration}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {dayjs(item.updatedAt).format("MMM D, YYYY h:mm A")}
                </Typography>
              </td>
              <td className={classes}>
                <IconButton onClick={()=>downloadFile(item.fileTranscription, item.fileName)} className="p-1 bg-transparent"><ArrowDownTrayIcon className="w-5 h-5 stroke-black"/></IconButton>
                <IconButton onClick={()=>handleDelete(item._id)} className="p-1 ml-2 bg-transparent hover:bg-red-100"><TrashIcon className="w-5 h-5 stroke-black"/></IconButton>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </Card>
  );
}

export default Table