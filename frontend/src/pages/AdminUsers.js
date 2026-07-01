import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function AdminUsers() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const token =
        localStorage.getItem(
          "adminToken"
        );

      const response =
        await axios.get(

          `${API}/admin/users`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

      setUsers(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const deleteUser = async (
    email
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const token =
        localStorage.getItem(
          "adminToken"
        );

      await axios.delete(

        `${API}/admin/delete-user/${email}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      fetchUsers();

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>
        👥 User Management
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px"
        }}
      >

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            users.map((user,index)=>(

              <tr key={index}>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>

                  <button

                    onClick={() =>
                      deleteUser(
                        user.email
                      )
                    }

                    style={{
                      backgroundColor:
                        "#ff4d4f",
                      color: "white",
                      border: "none",
                      padding:
                        "8px 12px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );
}

export default AdminUsers;