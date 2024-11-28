import React from "react";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import { remove } from "aws-amplify/storage";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GetFile from "../GetFile/GetFile";

export const UploadFile = ({
  files,
  setFiles,
  max = 1,
  title,
  acceptedFileTypes,
  deleteFiles,
}) => {
  const handleFileRemove = async (key) => {
    if (deleteFiles) {
      try {
        // await remove({
        //   path: key,
        //   bucket: "MyChurch",
        // });

        setFiles((prevFiles) => {
          const newFiles = { ...prevFiles };
          delete newFiles[key];
          return newFiles;
        });
      } catch (error) {
        console.error("Error al eliminar el archivo:", error);
      }
    }
  };

  return (
    <Box p={3}>
      <Typography variant='h5' gutterBottom>
        {title}
      </Typography>
      <Card elevation={3} style={{ padding: "20px" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <GetFile
                files={files}
                handleFileRemove={handleFileRemove}
                deleteFiles={deleteFiles}
              />
            </Grid>

            <Grid size={12}>
              <FileUploader
                acceptedFileTypes={acceptedFileTypes}
                path={({ identityId }) => `public/${identityId}/`}
                // components={{
                //   FileList() {},
                // }}
                maxFileCount={max}
                displayText={{
                  getFilesUploadedText(count) {
                    return `${"Archivo cargado"}`;
                  },
                  getFileSizeErrorText(sizeText) {
                    return `El tamaño del archivo debe ser menor a ${sizeText}`;
                  },
                  getRemainingFilesText(count) {
                    return `${count} ${
                      count === 1 ? "archivo" : "archivos"
                    } subiendo`;
                  },
                  getUploadingText(percentage) {
                    return `Subiendo${
                      percentage > 0 ? `: ${percentage}%` : ""
                    }`;
                  },
                  getUploadButtonText(count) {
                    return `Cargar ${count} ${
                      count === 1 ? "archivo" : "archivos"
                    }`;
                  },
                  getMaxFilesErrorText(count) {
                    return `No se pueden seleccionar más de ${count} ${
                      count === 1 ? "archivo" : "archivos"
                    }. Elimine archivos antes de actualizar.`;
                  },
                  getErrorText(message) {
                    return message;
                  },
                  doneButtonText: "Listo",
                  clearAllButtonText: "Limpiar todo",
                  extensionNotAllowedText: "Extensión no permitida",
                  browseFilesText: "Buscar archivos",
                  dropFilesText: "Arrastre los archivos aquí o",
                  pauseButtonText: "Pausa",
                  resumeButtonText: "Reanudar",
                  uploadSuccessfulText: "Carga exitosa",
                  getPausedText(percentage) {
                    return `Pausado: ${percentage}%`;
                  },
                }}
                onFileRemove={({ key }) => {
                  if (key) {
                    handleFileRemove(key);
                  }
                }}
                onUploadSuccess={({ key }) => {
                  if (key) {
                    setFiles((prevFiles) => {
                      if (max === 1) {
                        Object.keys(prevFiles).forEach((existingKey) => {
                          if (existingKey !== key) {
                            handleFileRemove(existingKey);
                          }
                        });
                        return { [key]: { status: "success" } };
                      }
                      return {
                        ...prevFiles,
                        [key]: { status: "success" },
                      };
                    });
                  }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
