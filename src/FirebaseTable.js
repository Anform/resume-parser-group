import React from "react"
import {useState,useEffect} from "react"
import {db} from "./firebase-config"
import {collection, getDocs, doc, deleteDoc} from "firebase/firestore"


const FirebaseTable = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [data, setData] = useState([])
    const dataCollectionRef = collection(db,"resume")

    const deleteEntry = async (id) => {
        const userDoc = doc(db, "resume", id)
        await deleteDoc(userDoc)
        window.location.reload()
    }

    useEffect(() => {
        const getData = async () => {
            const info = await getDocs(dataCollectionRef);
            setData(info.docs.map((doc) => ({...doc.data(), id: doc.id })))
        };
        getData();
    }, []);

    return (
        <>
            <div className = "userInput">
                <input type = "text" className = "searchBar" placeholder="Enter keywords..." onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            <section className = "table">
                <table border = "1" cellPadding= "20px">
                    <thead>
                        <tr>
                            <th scope = "col">Name</th>
                            <th scope = "col">Degree</th>
                            <th scope = "col">Languages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((val) => {
                            if(val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            val.languages.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            val.degree.toLowerCase().includes(searchTerm.toLowerCase()))
                            {
                                return val
                            }
                        }).map((info) => {
                            return (
                                <tr>
                                    <td>{info.name}</td>
                                    <td>{info.degree}</td>
                                    <td>{info.languages}</td>
                                    <td><button onClick ={() => deleteEntry(info.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default FirebaseTable