import { signIn } from "@/auth/auth"
import { IconBrandGoogle } from "@tabler/icons-react"
 
export default function SignInWithGoogle() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button 
        type="submit"
        className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-white border border-gray-300 px-4 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <IconBrandGoogle className="h-5 w-5 text-blue-500" />
        <span className="text-sm font-medium">
          Sign in with Google
        </span>
      </button>
    </form>
  )
} 