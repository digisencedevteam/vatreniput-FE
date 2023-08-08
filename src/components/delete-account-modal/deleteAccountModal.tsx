import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirmDelete,
}: Props) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          outline: "none",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Jeste li sigurni da želite obrisati korisnički račun?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="text"
            onClick={onClose}
            sx={{ mr: 2, color: "primary.main" }}
          >
            Otkaži
          </Button>
          <Button variant="contained" onClick={onConfirmDelete} color="error">
            Obriši korisnički račun
          </Button>
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}