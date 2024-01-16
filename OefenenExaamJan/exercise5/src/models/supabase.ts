export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      directories: {
        Row: {
          id: number
          name: string
          parentId: number | null
          userId: string | null
        }
        Insert: {
          id?: number
          name: string
          parentId?: number | null
          userId?: string | null
        }
        Update: {
          id?: number
          name?: string
          parentId?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'directories_parentId_fkey'
            columns: ['parentId']
            referencedRelation: 'directories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'directories_userId_fkey'
            columns: ['userId']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      group: {
        Row: {
          createdAt: string | null
          description: string
          id: string
          isPrivate: boolean
          name: string
          owner: string
        }
        Insert: {
          createdAt?: string | null
          description: string
          id?: string
          isPrivate?: boolean
          name: string
          owner: string
        }
        Update: {
          createdAt?: string | null
          description?: string
          id?: string
          isPrivate?: boolean
          name?: string
          owner?: string
        }
        Relationships: [
          {
            foreignKeyName: 'group_owner_fkey'
            columns: ['owner']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          receiver: string
          sender: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          receiver: string
          sender: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          receiver?: string
          sender?: string
        }
        Relationships: [
          {
            foreignKeyName: 'messages_receiver_fkey'
            columns: ['receiver']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'messages_sender_fkey'
            columns: ['sender']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      notes: {
        Row: {
          content: string
          folderId: number | null
          id: string
          title: string
          updatedAt: number
          userId: string
        }
        Insert: {
          content: string
          folderId?: number | null
          id?: string
          title: string
          updatedAt: number
          userId: string
        }
        Update: {
          content?: string
          folderId?: number | null
          id?: string
          title?: string
          updatedAt?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notes_folderId_fkey'
            columns: ['folderId']
            referencedRelation: 'directories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notes_userId_fkey'
            columns: ['userId']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      posts: {
        Row: {
          content: string
          createdAt: string
          groupId: string
          id: string
          parentId: string | null
          title: string | null
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          groupId: string
          id?: string
          parentId?: string | null
          title?: string | null
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          groupId?: string
          id?: string
          parentId?: string | null
          title?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'posts_groupId_fkey'
            columns: ['groupId']
            referencedRelation: 'group'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_parentId_fkey'
            columns: ['parentId']
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_userId_fkey'
            columns: ['userId']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          avatar: string
          firstName: string | null
          id: string
          name: string | null
          updatedAt: string
          username: string
        }
        Insert: {
          avatar?: string
          firstName?: string | null
          id: string
          name?: string | null
          updatedAt: string
          username: string
        }
        Update: {
          avatar?: string
          firstName?: string | null
          id?: string
          name?: string | null
          updatedAt?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      subscription: {
        Row: {
          groupId: string
          id: number
          userId: string
        }
        Insert: {
          groupId: string
          id?: number
          userId: string
        }
        Update: {
          groupId?: string
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'subscription_groupId_fkey'
            columns: ['groupId']
            referencedRelation: 'group'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'subscription_userId_fkey'
            columns: ['userId']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      tasks: {
        Row: {
          complete: boolean
          completedBy: string | null
          createdBy: string
          deadline: string
          id: number
          name: string
          toDoListId: number
        }
        Insert: {
          complete?: boolean
          completedBy?: string | null
          createdBy: string
          deadline: string
          id?: number
          name: string
          toDoListId: number
        }
        Update: {
          complete?: boolean
          completedBy?: string | null
          createdBy?: string
          deadline?: string
          id?: number
          name?: string
          toDoListId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'tasks_completedBy_fkey'
            columns: ['completedBy']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tasks_createdBy_fkey'
            columns: ['createdBy']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tasks_toDoListId_fkey'
            columns: ['toDoListId']
            referencedRelation: 'toDoList'
            referencedColumns: ['id']
          }
        ]
      }
      test: {
        Row: {
          id: number
          text: string | null
        }
        Insert: {
          id?: number
          text?: string | null
        }
        Update: {
          id?: number
          text?: string | null
        }
        Relationships: []
      }
      toDoList: {
        Row: {
          id: number
          isPrivate: boolean
          name: string
          ownerId: string
        }
        Insert: {
          id?: number
          isPrivate?: boolean
          name: string
          ownerId: string
        }
        Update: {
          id?: number
          isPrivate?: boolean
          name?: string
          ownerId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'toDoList_ownerId_fkey'
            columns: ['ownerId']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      userToDoList: {
        Row: {
          toDoListId: number
          userId: string
        }
        Insert: {
          toDoListId: number
          userId: string
        }
        Update: {
          toDoListId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'userToDoList_toDoListId_fkey'
            columns: ['toDoListId']
            referencedRelation: 'toDoList'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'userToDoList_userId_fkey'
            columns: ['userId']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
