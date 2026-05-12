import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  // Menu state
  const [menuItems, setMenuItems] = useState([]);
  const [menuForm, setMenuForm] = useState({ title: '', category: '', image: '' });
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [menuImagePreview, setMenuImagePreview] = useState('');
  // Staff state
  const [staff, setStaff] = useState([]);
  const [staffForm, setStaffForm] = useState({ name: '', designation: '', image: '' });
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [staffImagePreview, setStaffImagePreview] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

  useEffect(() => {
    fetchReservations();
    fetchStats();
    fetchUsers();
    fetchUserStats();
    fetchMenu();
    fetchStaff();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/reservations`);
      setReservations(response.data.reservations || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error('Failed to fetch reservations');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/reservations/stats`);
      setStats(response.data.stats || {});
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setStats({});
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users`);
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      setUsers([]);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users/stats`);
      setUserStats(response.data.stats || {});
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
      setUserStats({});
    }
  };

  // Menu CRUD
  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/menu`);
      setMenuItems(res.data.items || []);
    } catch (e) {
      console.error('Error fetching menu:', e);
      toast.error('Failed to fetch menu');
      setMenuItems([]);
    }
  };

  const handleMenuImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuImagePreview(reader.result);
        setMenuForm({ ...menuForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitMenu = async (e) => {
    e.preventDefault();
    try {
      if (editingMenuId) {
        await axios.put(`${API_BASE_URL}/menu/${editingMenuId}`, menuForm);
        toast.success('Menu item updated');
      } else {
        await axios.post(`${API_BASE_URL}/menu`, menuForm);
        toast.success('Menu item created');
      }
      setMenuForm({ title: '', category: '', image: '' });
      setMenuImagePreview('');
      setEditingMenuId(null);
      fetchMenu();
    } catch (e) {
      toast.error('Failed to save menu item');
    }
  };

  const editMenu = (item) => {
    setEditingMenuId(item._id);
    setMenuForm({ title: item.title, category: item.category, image: item.image });
    setMenuImagePreview(item.image);
  };

  const deleteMenuItem = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/menu/${id}`);
      toast.success('Menu item deleted');
      fetchMenu();
    } catch (e) {
      toast.error('Failed to delete menu item');
    }
  };

  // Staff CRUD
  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/staff`);
      setStaff(res.data.members || []);
    } catch (e) {
      console.error('Error fetching staff:', e);
      toast.error('Failed to fetch staff');
      setStaff([]);
    }
  };

  const handleStaffImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStaffImagePreview(reader.result);
        setStaffForm({ ...staffForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitStaff = async (e) => {
    e.preventDefault();
    try {
      if (editingStaffId) {
        await axios.put(`${API_BASE_URL}/staff/${editingStaffId}`, staffForm);
        toast.success('Staff updated');
      } else {
        await axios.post(`${API_BASE_URL}/staff`, staffForm);
        toast.success('Staff created');
      }
      setStaffForm({ name: '', designation: '', image: '' });
      setStaffImagePreview('');
      setEditingStaffId(null);
      fetchStaff();
    } catch (e) {
      toast.error('Failed to save staff');
    }
  };

  const editStaff = (member) => {
    setEditingStaffId(member._id);
    setStaffForm({ name: member.name, designation: member.designation, image: member.image });
    setStaffImagePreview(member.image);
  };

  const deleteStaffMember = async (id) => {
    if (!window.confirm('Delete this staff member?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/staff/${id}`);
      toast.success('Staff deleted');
      fetchStaff();
    } catch (e) {
      toast.error('Failed to delete staff');
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/reservations/${id}/status`, { status });
      toast.success('Reservation status updated successfully');
      fetchReservations();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update reservation status');
    }
  };

  const deleteReservation = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await axios.post(`${API_BASE_URL}/admin/reservations/${id}`);
        toast.success('Reservation deleted successfully');
        fetchReservations();
        fetchStats();
      } catch (error) {
        toast.error('Failed to delete reservation');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage restaurant reservations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Reservations</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Today's Reservations</h3>
            <p className="text-3xl font-bold text-green-600">{stats.today || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Confirmed</h3>
            <p className="text-3xl font-bold text-green-600">{stats.confirmed || 0}</p>
          </div>
        </div>

        {/* Users Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-purple-600">{userStats.total || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Admins</h3>
            <p className="text-3xl font-bold text-red-600">{userStats.admins || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Users</h3>
            <p className="text-3xl font-bold text-indigo-600">{userStats.users || 0}</p>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Reservations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.firstName} {reservation.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.email}</div>
                      <div className="text-sm text-gray-500">{reservation.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.date}</div>
                      <div className="text-sm text-gray-500">{reservation.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <select
                        value={reservation.status}
                        onChange={(e) => updateReservationStatus(reservation._id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => deleteReservation(reservation._id)}
                        className="text-red-600 hover:text-red-900 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{u.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{u.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{new Date(u.createdAt).toLocaleString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Menu Management */}
        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Popular Dishes (Menu)</h2>
          </div>
          <div className="p-6">
            <form onSubmit={submitMenu} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input className="border border-gray-300 rounded px-3 py-2" placeholder="Title" value={menuForm.title} onChange={(e) => setMenuForm({ ...menuForm, title: e.target.value })} required />
              <input className="border border-gray-300 rounded px-3 py-2" placeholder="Category" value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value.replace(/[^a-zA-Z\s]/g, '') })} required />
              <div className="flex flex-col">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleMenuImageChange} 
                  className="border border-gray-300 rounded px-3 py-2" 
                  required={!editingMenuId}
                />
                {menuImagePreview && (
                  <img 
                    src={menuImagePreview} 
                    alt="Preview" 
                    className="mt-2 w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
              <button className="bg-blue-600 text-white rounded px-4 py-2" type="submit">{editingMenuId ? 'Update' : 'Add'} Item</button>
            </form>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {menuItems.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={item.image} alt={item.title} style={{ width: 60, height: 40, objectFit: 'cover' }} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onClick={() => editMenu(item)} className="text-blue-600 hover:text-blue-900 text-xs">Edit</button>
                        <button onClick={() => deleteMenuItem(item._id)} className="text-red-600 hover:text-red-900 text-xs">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Staff Management */}
        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Our Team (Staff)</h2>
          </div>
          <div className="p-6">
            <form onSubmit={submitStaff} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input className="border border-gray-300 rounded px-3 py-2" placeholder="Name" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} required />
              <input className="border border-gray-300 rounded px-3 py-2" placeholder="Designation" value={staffForm.designation} onChange={(e) => setStaffForm({ ...staffForm, designation: e.target.value })} required />
              <div className="flex flex-col">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleStaffImageChange} 
                  className="border border-gray-300 rounded px-3 py-2" 
                  required={!editingStaffId}
                />
                {staffImagePreview && (
                  <img 
                    src={staffImagePreview} 
                    alt="Preview" 
                    className="mt-2 w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
              <button className="bg-blue-600 text-white rounded px-4 py-2" type="submit">{editingStaffId ? 'Update' : 'Add'} Member</button>
            </form>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staff.map((member) => (
                    <tr key={member._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={member.image} alt={member.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.designation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onClick={() => editStaff(member)} className="text-blue-600 hover:text-blue-900 text-xs">Edit</button>
                        <button onClick={() => deleteStaffMember(member._id)} className="text-red-600 hover:text-red-900 text-xs">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {reservations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reservations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
