import { SERVER_URL } from "../utils/constants";
import axios from 'axios'

export const setTask = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${SERVER_URL}/user/fetchUsers`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Error(error.response.data.message);
    }
};

export const createCard = async ({ cardData }) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${SERVER_URL}/card/createCard`, 
            {cardData}, 
            {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        console.log('Card created:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating card:", error);
        return new Error(error.response.data.message);
    }
}

export const fetchCards = async ({filter}) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${SERVER_URL}/card/fetchCards`, 
            {
            headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                filter: filter.toLowerCase(), 
            },
        });
        console.log('Cards:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching cards:", error);
        return new Error(error.response.data.message);
    }
}

export const changeCategory = async (category, cardId) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${SERVER_URL}/card/changeCategory`,
            {category, cardId},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error changing category: ", error);
        return new Error(error.response.data.message);
    }
}

export const deleteCard = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(`${SERVER_URL}/card/deleteCard/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting card: ", error);
        return new Error(error.response.data.message);
    }
}

export const updateCard = async (id, cardDetails) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(`${SERVER_URL}/card/updateCard/${id}`,
            {
                title: cardDetails.title,
                priority: cardDetails.priority,
                checklist: cardDetails.checklist,
                dueDate: cardDetails.dueDate,
                assignee: cardDetails.assignee
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating card: ", error);
        return new Error(error.response.data.message);
    }
}

export const getSummary = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${SERVER_URL}/card/summary`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching summary: ", error);
        return new Error(error.response.data.message);
    }
}

export const updateChecklistItemStatus = async (cardId, itemId, completed) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(`${SERVER_URL}/card/${cardId}/checklist/${itemId}`, { completed }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      return response.data;
    } catch (error) {
      console.error("Error updating checklist item:", error);
      throw error;
    }
  };


  export const fetchPublicCard = async (cardId) => {
    try {
        const response = await axios.get(`${SERVER_URL}/publicCard/fetchPublicCard/${cardId}`);
        console.log('Card:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching card:", error);
        return new Error(error.response.data.message);
    }
}