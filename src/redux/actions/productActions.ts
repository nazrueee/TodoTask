import {apiDelete, apiGet, apiPost, apiPut} from '../../utils/utils';
import {
  ADD_TASK,
  DELETE,
  GET_PRODUCTS,
  TASK_UPDATE,
} from '../../utils/urls';

export const fetchTodoList = async () => {
  try {
    const productsListItem = await apiGet<string[]>(GET_PRODUCTS);
    return [...productsListItem];
  } catch (error: any) {
    console.error('Failed to fetch categories:', error.message);
    return ['ALL'];
  }
};

export const fetchProducts = async (category: string, page: number) => {
  const skip = (page - 1) * 10; // Pagination based on 10 items per page
  const url =
    category === 'ALL'

  try {
    const response = await apiGet<{products: any[]}>(url);
    return response.products;
  } catch (error: any) {
    console.error(`Failed to fetch products for ${category}:`, error.message);
    return [];
  }
};

export const deleteTodoTask = async (id: number): Promise<any[]> => {
  try {
    const response = await apiDelete<{products: any[]}>(DELETE(id));
    console.log(response, 'ressssssssss');

    return response.products;
  } catch (error: any) {
    console.error('Failed to delete task:', error.message);
    return [];
  }
};

export const addTodo = async (data: {title: string; completed: boolean}) => {
  try {
    const response = await apiPost<any>(ADD_TASK, data);
    console.log('Task added successfully:', response);
    return response;
  } catch (error: any) {
    console.error('Failed to add task:', error.message);
    throw error;
  }
};

export const updateTodo = async (
  id: number,
  data: {title?: string; completed: boolean},
) => {
  try {
    const response = await apiPut<any>(TASK_UPDATE(id));
    console.log('Task updated successfully:', response);
    return response;
  } catch (error: any) {
    console.error('Failed to update task:', error.message);
    throw error;
  }
};
