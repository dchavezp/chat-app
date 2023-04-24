import { type Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
function useAuth() {
    const [loading, setLoding] = useState<boolean>(false);
    const [sessionData, setSessionData] = useState<Session | null>()
    const session = useSession();
    useEffect(() => {
        setLoding(session.status === "loading")
        setSessionData(session.data)
    }, [session])
    return { loading, sessionData, signIn, signOut };
}
export default useAuth;