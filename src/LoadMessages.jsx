import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import {
  NumericTextBox,
  Input
} from "@progress/kendo-react-inputs";

const DATA_ITEM_KEY = "id";

function LoadMessages() {

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
      .then((res) => {
        setMessage(res.data);
        setOriginalData(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log(err));
  };

  const handleEditChange = (event) => {
    setEdit(event.edit);
  };

  const itemChange = (event) => {

    const updated = message.map((item) => {

      if (item.id !== event.dataItem.id) {
        return item;
      }

      switch (event.field) {

        case "sender":
          return {
            ...item,
            sender: event.value
          };

        case "text":
          return {
            ...item,
            text: event.value
          };

        case "likes":
          return {
            ...item,
            data: {
              ...item.data,
              likes: event.value
            }
          };

        case "dislikes":
          return {
            ...item,
            data: {
              ...item.data,
              dislikes: event.value
            }
          };

        case "status":
          return {
            ...item,
            data: {
              ...item.data,
              status: event.value
            }
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

    } catch (err) {
      console.log(err);
    }

  };

  const cancelChanges = () => {

    setMessage(
      JSON.parse(JSON.stringify(originalData))
    );

    setChanges(false);
    setEdit({});
  };

  const LikesEditCell = (props) => (
    <td>
      <NumericTextBox
        value={props.dataItem.data.likes}
        onChange={(e) =>
          itemChange({
            dataItem: props.dataItem,
            field: "likes",
            value: e.value
          })
        }
      />
    </td>
  );

  const DislikesEditCell = (props) => (
    <td>
      <NumericTextBox
        value={props.dataItem.data.dislikes}
        onChange={(e) =>
          itemChange({
            dataItem: props.dataItem,
            field: "dislikes",
            value: e.value
          })
        }
      />
    </td>
  );

  const StatusEditCell = (props) => (
    <td>
      <Input
        value={props.dataItem.data.status}
        onChange={(e) =>
          itemChange({
            dataItem: props.dataItem,
            field: "status",
            value: e.value
          })
        }
      />
    </td>
  );

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
          cells={{
            data: (props) => (
              <td>{props.dataItem.data.likes}</td>
            ),
            edit: LikesEditCell
          }}
        />

        <GridColumn
          field="dislikes"
          title="Dislikes"
          cells={{
            data: (props) => (
              <td>{props.dataItem.data.dislikes}</td>
            ),
            edit: DislikesEditCell
          }}
        />

        <GridColumn
          field="status"
          title="Status"
          cells={{
            data: (props) => (
              <td>{props.dataItem.data.status}</td>
            ),
            edit: StatusEditCell
          }}
        />

      </Grid>

    </div>

  );
}

export default LoadMessages;