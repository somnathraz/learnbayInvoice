import React from "react";
import style from "./BatchDateBox.module.css";
import { MdDeleteForever } from "react-icons/md";

const BatchDateBox = ({ PassBatchData }) => {
  const handler = async (id, batchId) => {
    //  console.log(id);
    const data = await fetch("/api/v1/deleteBatch", {
      method: "DELETE",
      body: JSON.stringify({ id: id, batchId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.status === 200) {
      const { msg } = await data.json();
      alert(msg);
    }
  };

  console.log("@@@@","Api is working fine")

  console.log("@@@",PassBatchData)


  return (
    <div className={style.wrapper}>
      <h2>Batch Details</h2>
      <div className={style.wrapperDiv}>
        {PassBatchData.map((data, i) => {
          // console.log(data.batchDetails.length === 0 ? "hi" : "bye");
          return data.batchDetails.length === 0 ? (
            ""
          ) : (
            <div className={style.wrapperContent} key={i}>
              <div>
                <h3>ID: {data.id}</h3>
                {data.batchDetails.map((dataS, i) => {
                  return (
                    <div className={style.innerBox} key={i}>
                      <MdDeleteForever
                        className={style.delIcon}
                        onClick={() => handler(data.id, dataS.batchId)}
                      />
                      <p>ID: {dataS.batchId}</p>
                      <p>Day: {dataS.daysInfo}</p>
                      <p>BatchDate: {dataS.dateInfo}</p>
                      <p>
                        BatchTime: {dataS.timeInfo}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BatchDateBox;
