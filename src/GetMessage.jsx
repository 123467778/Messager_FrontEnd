
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "@progress/kendo-theme-default/dist/all.css";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import { process } from "@progress/kendo-data-query";

// function GetMessage() {
//     const [message, setMessage] = useState([]);

//     const [dataState, setDataState] = useState({
//         skip: 0,
//         take: 5,
//         sort: []
//     });

//     const [result, setResult] = useState(
//         process([], dataState)
//     );

//     useEffect(() => {
//         loadMessage();
//     }, []);

//     const loadMessage = async () => {
//         try {
//             const response = await axios.get(
//                 "http://localhost:8080/message/get"
//             );

//             console.log("API Response:", response.data);

//             setMessage(response.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         setResult(process(message, dataState));
//     }, [message, dataState]);

//     const handleDataStateChange = (event) => {
//         setDataState(event.dataState);
//     };

//     return (
//         <div>
//             <h2>Messages</h2>

//             <Grid
//                 data={result}
//                 skip={dataState.skip}
//                 take={dataState.take}
//                 total={result.total}
//                 pageable={true}
//                 sortable={true}
//                 onDataStateChange={handleDataStateChange}
//             >
//                 <GridColumn field="id" title="ID" />
//                 <GridColumn field="sender" title="Sender" />
//                 <GridColumn field="text" title="Text" />
//                 <GridColumn field="data.likes" title="Likes" />
//                 <GridColumn field="data.dislikes" title="Dislikes" />
//                 <GridColumn field="data.status" title="Status" />
//             </Grid>
//         </div>
//     );
// }

// export default GetMessage;




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



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import "@progress/kendo-theme-default/dist/all.css";


const DATA_ITEM_KEY = "id";

function GetMessage() {
    const [message, setMessage] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [edit, setEdit] = useState({});
    const [changes, setChanges] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        axios
            .get("http://localhost:8080/message/get")
            .then((response) => {
                setMessage(response.data);
                setOriginalData(
                    JSON.parse(JSON.stringify(response.data))
                );
            })
            .catch((error) => console.log(error));
    };

    const handleEditChange = (event) => {
        setEdit(event.edit);
    };

    const itemChange = (event) => {
        const field = event.field;

        const updated = message.map((item) => {
            if (item.id !== event.dataItem.id) {
                return item;
            }

            switch (field) {
                case "sender":
                    return {
                        ...item,
                        sender: event.value,
                    };

                case "text":
                    return {
                        ...item,
                        text: event.value,
                    };

                case "likes":
                    return {
                        ...item,
                        data: {
                            ...item.data,
                            likes: event.value,
                        },
                    };

                case "dislikes":
                    return {
                        ...item,
                        data: {
                            ...item.data,
                            dislikes: event.value,
                        },
                    };

                case "status":
                    return {
                        ...item,
                        data: {
                            ...item.data,
                            status: event.value,
                        },
                    };

                default:
                    return item;
            }
        });

        setMessage(updated);
        setChanges(true);
    };

    const saveChanges = async () => {
        try {
            await Promise.all(
                message.map((item) =>
                    axios.put(
                        `http://localhost:8080/message/${item.id}`,
                        item
                    )
                )
            );

            setChanges(false);
            setEdit({});
            fetchMessages();
        } catch (error) {
            console.log(error);
        }
    };

    const cancelChanges = () => {
        setMessage(
            JSON.parse(JSON.stringify(originalData))
        );
        setChanges(false);
        setEdit({});
    };

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <Button
                    onClick={saveChanges}
                    disabled={!changes}
                >
                    Save Changes
                </Button>

                <Button
                    onClick={cancelChanges}
                    disabled={!changes}
                    style={{ marginLeft: "10px" }}
                >
                    Cancel Changes
                </Button>
            </div>

            <Grid
                style={{ height: "500px" }}
                data={message}
                dataItemKey={DATA_ITEM_KEY}
                edit={edit}
                editable={{ mode: "incell" }}
                onEditChange={handleEditChange}
                onItemChange={itemChange}
            >
                <GridColumn
                    field="id"
                    title="Id"
                    editable={false}
                    width="80px"
                />

                <GridColumn
                    field="sender"
                    title="Sender"
                />

                <GridColumn
                    field="text"
                    title="Message"
                />

                <GridColumn
                    field="likes"
                    title="Likes"
                    editor="numeric"
                    cells={{
                        data: (props) => (
                            <td>
                                {props.dataItem.data.likes}
                            </td>
                        ),
                    }}
                />

                <GridColumn
                    field="dislikes"
                    title="Dislikes"
                    editor="numeric"
                    cells={{
                        data: (props) => (
                            <td>
                                {props.dataItem.data.dislikes}
                            </td>
                        ),
                    }}
                />

                <GridColumn
                    field="status"
                    title="Status"
                    cells={{
                        data: (props) => (
                            <td>
                                {props.dataItem.data.status}
                            </td>
                        ),
                    }}
                />
            </Grid>
        </div>
    );
}

export default GetMessage;