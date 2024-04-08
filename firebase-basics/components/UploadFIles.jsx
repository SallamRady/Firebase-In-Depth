import {
  Box,
  Typography,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Button,
} from "@mui/material";
import Cloud from "@mui/icons-material/Cloud";
import {
  deleteObject,
  getBytes,
  getDownloadURL,
  list,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/firebase.config";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FilesPanel() {
  const [uploadFile, setUploadFile] = useState(null);
  const [imgUrls, setImgsUrls] = useState([]);

  const UploadFileToFirebaseStorage = () => {
    console.log("uploadFile", uploadFile);
    if (uploadFile) {
      const storageRef = ref(storage, `images/${uploadFile.name}`);

      uploadBytes(storageRef, uploadFile)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
        })
        .catch((err) => {
          console.log("Error in Upload file", err);
        });
    }
  };
  const getFileHttpUrl = async (filePath) => {
    try {
      let httpUrl = await getDownloadURL(ref(storage, filePath));
      return httpUrl;
    } catch (err) {
      console.log("Error in get image url::", err);
    }
  };
  const DownloadImage = () => {
    getDownloadURL(
      ref(storage, "images/sharad seedless grapes 500 - fruits.jpg")
    )
      .then((url) => {
        console.log("Url::", url);
      })
      .catch((err) => {
        console.log("Error::", err);
      });
  };
  const DeleteFileFromFirebaseStorage = () => {
    console.log("Delete  image..");
    let imgRef = ref(storage, "images/watermelon - fruits.jpg");
    // Delete the file
    deleteObject(imgRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!");
      });
  };

  //   async function getPublicUrl(imagePath) {
  //     const bucket = admin.storage().bucket();
  //     const file = bucket.file(imagePath);
  //     const [url] = await file.getSignedUrl({
  //       action: "read",
  //       expires: "03-09-2024"
  //     });

  //     console.log(url);
  //     return url;
  //   }

  const ReadAllImages = async () => {
    list(ref(storage, "images"))
      .then((res) => {
        return res.items.map(async (temRef) => {
          let url = await getFileHttpUrl(temRef.fullPath);
          console.log("url", url);
          setImgsUrls((prev) => [...prev, url]);
          return url;
        });
      })
      .catch((error) => {
        console.log("Error in read files", error);
      });
  };

  useEffect(() => {
    console.log("imgUrls", imgUrls);
  }, [imgUrls]);

  return (
    <Box width={"95%"}>
      <Typography variant="h5" fontWeight={800}>
        Files Panel
      </Typography>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        {/* upload */}
        <Box border={"1px solid"} padding={1}>
          <Button
            component="label"
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setUploadFile(e.target.files[0])}
            />
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginX: 2 }}
            onClick={() => UploadFileToFirebaseStorage()}
          >
            Upload File
          </Button>
        </Box>
        {/* Read */}
        <Button
          variant="contained"
          color="success"
          sx={{ marginX: 2 }}
          onClick={() => ReadAllImages()}
        >
          Read Files
        </Button>
        {/* Download */}
        <Button
          variant="contained"
          color="info"
          sx={{ marginX: 2 }}
          onClick={() => DownloadImage()}
        >
          Download Image
        </Button>
        {/* Delete */}
        <Button
          variant="contained"
          color="error"
          sx={{ marginX: 2 }}
          onClick={() => DeleteFileFromFirebaseStorage()}
        >
          Download File
        </Button>
      </Stack>
      <MenuList>
        {imgUrls.map((url) => (
          <MenuItem key={url}>
            <img src={url} width={"100px"} height={"100px"} />
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>{url.value}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
}
