'use client'
import {
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import Cloud from "@mui/icons-material/Cloud";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { useState } from "react";

const advice_to_success = [
  "Believe in yourself and your abilities.",
  "Set clear goals and work towards them consistently.",
  "Stay disciplined and committed to your goals.",
  "Learn from your failures and use them as stepping stones to success.",
  "Surround yourself with positive and supportive people.",
  "Take care of your physical and mental health.",
  "Embrace change and adapt to new situations.",
  "Always keep learning and expanding your knowledge.",
  "Take calculated risks to move forward.",
  "Stay persistent and never give up on your dreams.",
  "Manage your time effectively and prioritize tasks.",
  "Be proactive and take initiative in all aspects of your life.",
  "Practice gratitude and appreciate what you have.",
  "Stay focused on your priorities and avoid distractions.",
  "Seek feedback and learn from criticism.",
  "Stay humble and open-minded.",
  "Build strong relationships and network with others.",
  "Stay true to your values and principles.",
  "Be proactive in seeking opportunities for growth.",
  "Practice self-reflection and self-improvement.",
  "Stay patient and trust the process.",
  "Celebrate your successes, no matter how small.",
  "Maintain a healthy work-life balance.",
  "Take care of your finances and plan for the future.",
  "Be adaptable and willing to embrace change.",
  "Stay resilient in the face of adversity.",
  "Don't be afraid to ask for help when you need it.",
  "Focus on what you can control and let go of what you can't.",
  "Stay curious and never stop exploring new ideas.",
  "Be kind and compassionate towards others.",
  "Set boundaries and learn to say no when necessary.",
  "Find joy in the journey, not just the destination.",
  "Stay organized and manage your time effectively.",
  "Stay true to yourself and your values.",
  "Surround yourself with positive influences.",
  "Learn to manage stress and prioritize self-care.",
  "Stay committed to your goals, even when it gets tough.",
  "Stay persistent and don't give up easily.",
  "Be open to feedback and willing to learn from others.",
  "Take ownership of your actions and decisions.",
  "Stay focused on your long-term vision.",
  "Believe in yourself, even when others don't.",
  "Stay humble and never stop learning.",
  "Be willing to adapt and evolve with changing circumstances.",
  "Stay resilient in the face of challenges.",
  "Practice empathy and understanding towards others.",
  "Stay mindful and present in each moment.",
  "Surround yourself with people who uplift and inspire you.",
  "Take responsibility for your actions and choices.",
  "Stay committed to your personal growth and development.",
];
export default function NotesPanel() {
  const [advices, setAdvices] = useState([]);

  const handleAddRandomAdvice = async () => {
    try {
      let advice = advice_to_success[Math.floor(Math.random() * 50)];
      const docRef = await addDoc(collection(db, "advices"), {
        author: "Sallam Rady",
        target: "learn firebase from zero to hero",
        advice,
      });
      console.log("Document written with ID: ", docRef.id, docRef);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  const RefreshReadingData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "advices"));
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAdvices(arr);
    } catch (err) {
      console.error("Error reading data: ", err);
    }
  };
  const ReadSpecificData = async () => {
    try {
      const collectionInfo = collection(db, "advices");
      const q = query(collectionInfo, where("author", "==", "Sallam Rady"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    } catch (err) {
      console.error("Error reading data: ", err);
    }
  };
  const UpdateDocumention = async (id) => {
    const docRef = doc(db, "advices", id);
    await updateDoc(docRef, {
      advice: "Demo",
    });
  };

  const DeleteDocumention = async (id) => {
    await deleteDoc(doc(db, "advices", id));
  };

  return (
    <Stack width={"95%"}>
      <Typography variant="h5" fontWeight={800}>
        NotesPanel
      </Typography>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ marginX: 2 }}
          onClick={() => handleAddRandomAdvice()}
        >
          Add Random Advice
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginX: 2 }}
          onClick={() => RefreshReadingData()}
        >
          Reading Data
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ marginX: 2 }}
          onClick={() => ReadSpecificData()}
        >
          Get Specific Data
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ marginX: 2 }}
          onClick={() => UpdateDocumention("6UMzyszaHdOLeNeIafIS")}
        >
          Update First Doc
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ marginX: 2 }}
          onClick={() => DeleteDocumention("6UMzyszaHdOLeNeIafIS")}
        >
          Delete First Doc
        </Button>
      </Stack>
      <MenuList>
        {advices.map((ele) => (
          <MenuItem key={ele.id}>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>{ele.advice}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Stack>
  );
}
