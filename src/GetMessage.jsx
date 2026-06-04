
import React, { useEffect, useState } from "react";
import axios from "axios";
import "@progress/kendo-theme-default/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";

function GetMessage() {
    const [message, setMessage] = useState([]);

    const [dataState, setDataState] = useState({
        skip: 0,
        take: 5,
        sort: []
    });

    const [result, setResult] = useState(
        process([], dataState)
    );

    useEffect(() => {
        loadMessage();
    }, []);

    const loadMessage = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/message/get"
            );

            console.log("API Response:", response.data);

            setMessage(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setResult(process(message, dataState));
    }, [message, dataState]);

    const handleDataStateChange = (event) => {
        setDataState(event.dataState);
    };

    return (
        <div>
            <h2>Messages</h2>

            <Grid
                data={result}
                skip={dataState.skip}
                take={dataState.take}
                total={result.total}
                pageable={true}
                sortable={true}
                onDataStateChange={handleDataStateChange}
            >
                <GridColumn field="id" title="ID" />
                <GridColumn field="sender" title="Sender" />
                <GridColumn field="text" title="Text" />
                <GridColumn field="data.likes" title="Likes" />
                <GridColumn field="data.dislikes" title="Dislikes" />
                <GridColumn field="data.status" title="Status" />
            </Grid>
        </div>
    );
}

export default GetMessage;




//         //     <h1>Messages</h1>
//         //     {
//         //         message.map((m)=>{
//         //          return(    <div key={m.id}>
//         //       <h1>{m.sender}</h1>
//         //       <p>{m.text}</p>
//         //        <p>Likes: {m.data.like}</p>
//         //     <p>Dislikes: {m.data.dislike}</p>
//         //     <p>Status: {m.data.status}</p>


//         //      </div>
//         //          );
//         //         })
//         //     }
//         //  </div>