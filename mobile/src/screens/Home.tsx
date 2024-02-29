import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

export default function Home() {

  const [endDate, setEndDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [timeRemainingText, setTimeRemainingText] = useState("")

  useEffect(() => {
    axios.get("http://192.168.0.100:8080/timer")
      .then(response => {
        setEndDate(response.data.endDate)
        setIsLoading(false)
        setTimeRemainingText(format(endDate, "dd 'de' MMMM 'às' HH:mm:ss", { locale: ptBR }))
        console.log(format(endDate, "dd 'de' MMMM 'às' HH:mm:ss", { locale: ptBR }))
      })
  }, [endDate])

  function handleUpdateTimeOnServer() {
    axios.post("http://192.168.0.100:8080/timer", {
      "password": process.env.UPDATE_TIMER_PASSWORD
    }).then(response => {
      setEndDate(response.data.newEndDate)
    })
  }

  return (
    <View style={styles.body}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateTimeOnServer}>
          <Text style={styles.buttonText}>Atualizar timer</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.timerTextAbove}>Data final:</Text>
          <Text style={styles.timerText}>{isLoading ? "Carregando..." : timeRemainingText}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  header: {
    width: "100%",
    height: "14%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerText: {
    color: "white",
    fontWeight: "900",
    fontSize: 24,
    marginTop: 32
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  button: {
    backgroundColor: "#ff4136",
    padding: 32,
    borderRadius: 8,
    borderBottomWidth: 8,
    borderBottomColor: "#b1261f",
    marginBottom: 92
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#5e0500"
  },
  timerText: {
    color: "white",
    fontSize: 20
  },
  timerTextAbove: {
    color: "white",
    fontSize: 16,
    marginBottom: 8
  }
});
