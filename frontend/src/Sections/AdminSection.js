import React from 'react';
import OptionSelection from "../AIOptions/OptionSelection";
import { Link } from 'react-router-dom';
const AdminSection = ({ showAplikasi, handleAdmin, handleAplikasi, handleAddNew, users, admin, myUserId, confirmDeleteUser, option, filterCondition, handleFilterChange, arrayItems, selectOption }) => (
  <>
    <br></br>
    <span> Pilih Tampilan dengan klik Tombol dibawah ini :  </span>
    <button
      onClick={showAplikasi ? handleAdmin : handleAplikasi}
      className="button is-warning is-fullwidth mt-5"
    >
      {showAplikasi ? 'Admin' : 'Aplikasi'}
    </button>
    <br></br>
    {showAplikasi ? (
      <>
        <button onClick={handleAddNew} className="button is-success" key={admin}>
          Tambah Baru
        </button>
        <div className="table-container mt-5">
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
              <th className="has-text-centered">No</th>
                <th className="has-text-centered">Nama</th>
                <th className="has-text-centered">Email</th>
                <th className="has-text-centered">Token</th>
                <th className="has-text-centered">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.click}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `edit/${user.id}`,
                        state: {
                          myUserId: myUserId,
                          id: user.id,
                          nama: user.nama,
                          email: user.email,
                        },
                      }}
                      className="button is-small is-info mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => confirmDeleteUser(user.id, user.nama)}
                      className="button is-small is-danger"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ) : (
      <>
        {Object.values(option).length === 0 && (
          <>
            <div className="buttons has-addons is-centered">
              <button
                className={`button ${filterCondition === 'copywriting' ? 'is-info' : ''}`}
                onClick={() => handleFilterChange('copywriting')}
              >
                Copywriting
              </button>
            </div>
            <OptionSelection arrayItems={arrayItems.filter(item => item.kategori === filterCondition)} selectOption={selectOption} />
          </>
        )}
      </>

    )

    }
  </>
);

export default AdminSection;
