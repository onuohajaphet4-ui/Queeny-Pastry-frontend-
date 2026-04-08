import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const OAuthSuccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")

    if (!token) {
      navigate("/login")
      return
    }
      
    //clesar prevous token
    localStorage.clear()
    // Save token
    localStorage.setItem("token", token)

    // Decode token
    const payload = JSON.parse(atob(token.split(".")[1]))

    if (payload.role === "admin") {
      navigate("/admin")
    } else {
      navigate("/customer")
    }
  }, [])

  return <p>Signing you in...</p>
}

export default OAuthSuccess