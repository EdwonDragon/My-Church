"use client";

import React, { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import {
  Box,
  Typography,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { Image } from "@aws-amplify/ui-react";

interface GetFileProps {
  files: string[];
  handleFileRemove: (file: string) => void;
  deleteFiles: boolean;
}

const GetFile: React.FC<GetFileProps> = ({
  files,
  handleFileRemove,
  deleteFiles,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [filesArray, setFilesArray] = useState<any>([]);

  const processFiles = async () => {
    const array = Object.keys(files).map((key) => key);

    const processedArray = await Promise.all(
      array.map(async (key: any) => {
        const extension = getExtension(key);
        const url = await fetchFileUrl(key);
        return { key, extension, url };
      })
    );

    setFilesArray(processedArray);
  };

  useEffect(() => {
    if (files && Object.keys(files).length > 0) {
      processFiles();
    } else {
      setFilesArray([]);
    }
  }, [files]);

  const getExtension = (filename: string): string =>
    filename.split(".").pop()?.toLowerCase() || "";

  const isImage = (ext: string): boolean =>
    ["jpg", "jpeg", "png", "gif", "bmp"].includes(ext);

  const isPdf = (ext: string): boolean => ["pdf"].includes(ext);
  const handleOpenModal = (url: string, ext: string) => {
    setCurrentFile(url);
    setFileType(ext);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCurrentFile(null);
    setFileType(null);
  };

  const fetchFileUrl = async (path: string): Promise<string | null> => {
    try {
      const { url } = await getUrl({ path });
      return url.toString();
    } catch (error) {
      console.error("Error fetching file URL:", error);
      return null;
    }
  };

  return (
    <Box p={2}>
      <Grid container spacing={3}>
        {filesArray.map((file: any, index: any) => {
          return (
            <Grid size={3} key={index}>
              <Card elevation={2}>
                {file.url ? (
                  isImage(file.extension) ? (
                    <Image
                      onClick={() =>
                        file.url && handleOpenModal(file.url, file.extension)
                      }
                      alt='Preview'
                      src={file.url}
                      objectFit='contain'
                      objectPosition='center'
                      width={200}
                      height={70}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  ) : isPdf(file.extension) ? (
                    <Box display='flex' justifyContent='center' p={1}>
                      <Button
                        startIcon={<RemoveRedEyeIcon />}
                        color='secondary'
                        variant='contained'
                        onClick={() =>
                          file.url && handleOpenModal(file.url, file.extension)
                        }
                      >
                        Ver archivo
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <Button
                        fullWidth
                        variant='outlined'
                        color='secondary'
                        href={file.url}
                        target={file.extension == "txt" ? "_blank" : ""}
                        download
                        startIcon={
                          file.extension == "txt" ? (
                            <RemoveRedEyeIcon />
                          ) : (
                            <SimCardDownloadIcon />
                          )
                        }
                      >
                        {file.extension == "txt"
                          ? "Ver archivo"
                          : "Descargar archivo"}
                      </Button>
                    </>
                  )
                ) : (
                  <Typography p={2}>Loading vista previe...</Typography>
                )}
                {deleteFiles && (
                  <Box display='flex' justifyContent='center' p={1}>
                    <Button
                      startIcon={<DeleteIcon />}
                      color='error'
                      onClick={() => handleFileRemove(file.key)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={open} onClose={handleCloseModal} maxWidth='lg' fullWidth>
        <DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {fileType && isImage(fileType) ? (
            <Box
              component='img'
              src={currentFile || ""}
              alt='Preview'
              sx={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
          ) : fileType === "pdf" ? (
            <iframe
              src={currentFile || ""}
              title='PDF Preview'
              style={{
                width: "100%",
                height: "80vh",
                border: "none",
              }}
            ></iframe>
          ) : (
            <></>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GetFile;
