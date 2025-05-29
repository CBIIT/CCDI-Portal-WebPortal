import React, { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import TabsView from "../tabs/TabsView";

const ModalView = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Button
        variant="text"
        onClick={handleOpen}
        endIcon={<SearchIcon fontSize="small" />}
        style={{
          textTransform: "none",
          color: "#455299",
          fontFamily: "Inter",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "22px",
          textDecoration: "underline",
          background: "none",
          padding: 0,
          minWidth: "auto",
          paddingLeft: "3rem",
        }}
      >
        See Enlarged View
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            // padding: 24,
            outline: "none",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            minWidth: 900,
            minWeight: 550,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              padding: 16,
              paddingBottom: 8,
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "19px",
                fontFamily: "Poppins",
                fontWeight: "400",
              }}
            >
              Study Profile:{" "}
              <span
                style={{
                  fontWeight: "700",
                }}
              >
                {data.study_id}
              </span>
            </h2>
            <Button onClick={handleClose} style={{ minWidth: 0, padding: 4 }}>
              <CloseIcon />
            </Button>
          </div>
          {/* Body */}
          <div
            style={{
              padding: 16,
              paddingTop: 0,
            }}
          >
            <TabsView data={data} isModalView={true} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalView;
