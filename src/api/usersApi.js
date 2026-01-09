import { mockUsers } from '../data/mockUsers'

export const fetchUsers = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Randomly fail sometimes to test error handling (optional, but good for demo)
  // if (Math.random() > 0.8) throw new Error('Network error')

  return mockUsers
}
