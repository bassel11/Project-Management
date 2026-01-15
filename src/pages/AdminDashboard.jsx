import RegisterUserForm from '../components/admin/RegisterUserForm'
import EnableMFAForm from '../components/admin/EnableMFAForm'

const AdminDashboard = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400">Administrative tools: user registration and MFA management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded bg-white dark:bg-zinc-900">
          <h2 className="font-medium mb-3">Register New User</h2>
          <RegisterUserForm />
        </div>

        <div className="p-6 border rounded bg-white dark:bg-zinc-900">
          <h2 className="font-medium mb-3">Enable MFA</h2>
          <EnableMFAForm />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
