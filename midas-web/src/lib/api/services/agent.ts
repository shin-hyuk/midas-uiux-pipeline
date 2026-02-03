/**
 * AI Agent Service
 * 
 * PRD: personal-investment-buddy.md, quick-action-buttons.md
 * Uses REAL API from midas-agent backend
 */

import { apiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import type { ChatRequest, ChatResponse, ChatConversation, ChatMessage, QuickAction } from '../types'

interface BackendChatResponse {
  message: string
  conversation_id: string
  quick_actions?: Array<{
    type: string
    label: string
    payload: Record<string, unknown>
  }>
}

interface BackendConversation {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
  messages?: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    quick_actions?: Array<{
      type: string
      label: string
      payload: Record<string, unknown>
    }>
    timestamp: string
  }>
}

export const agentService = {
  /**
   * Send message to AI agent
   * PRD: Conversational AI Assistant (US-40)
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await apiClient.post<BackendChatResponse>(API_ENDPOINTS.agent.chat, {
      message: request.message,
      conversation_id: request.conversationId,
      context: request.context ? {
        user_avatar: request.context.userAvatar,
        current_page: request.context.currentPage,
        selected_strategy_id: request.context.selectedStrategyId,
        selected_symbol: request.context.selectedSymbol,
      } : undefined,
    })

    return {
      message: response.message,
      conversationId: response.conversation_id,
      quickActions: response.quick_actions?.map(qa => ({
        type: qa.type as QuickAction['type'],
        label: qa.label,
        payload: qa.payload,
      })),
    }
  },

  async getConversations(): Promise<ChatConversation[]> {
    const response = await apiClient.get<BackendConversation[]>(API_ENDPOINTS.agent.conversations)
    return response.map(c => ({
      id: c.id,
      title: c.title,
      messages: c.messages?.map(m => ({
        id: m.id,
        role: m.role,
        content: m.content,
        quickActions: m.quick_actions?.map(qa => ({
          type: qa.type as QuickAction['type'],
          label: qa.label,
          payload: qa.payload,
        })),
        timestamp: m.timestamp,
      })) || [],
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }))
  },

  async getConversation(id: string): Promise<ChatConversation> {
    const c = await apiClient.get<BackendConversation>(API_ENDPOINTS.agent.conversation(id))
    return {
      id: c.id,
      title: c.title,
      messages: c.messages?.map(m => ({
        id: m.id,
        role: m.role,
        content: m.content,
        quickActions: m.quick_actions?.map(qa => ({
          type: qa.type as QuickAction['type'],
          label: qa.label,
          payload: qa.payload,
        })),
        timestamp: m.timestamp,
      })) || [],
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }
  },

  async deleteConversation(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.agent.conversation(id))
  },
}
