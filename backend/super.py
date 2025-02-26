from langchain_openai import ChatOpenAI
from langchain_ollama import ChatOllama
from langgraph_supervisor import create_supervisor
from langgraph.prebuilt import create_react_agent
from langgraph.types import interrupt

#model = ChatOllama(model="mistral-small:latest", temperature=0)
model = ChatOpenAI(base_url="https://api.githubcopilot.com", model="claude-3.5-sonnet", temperature=0)

# Create specialized agents
def get_product_backlog_items():
    """Get the product backlog items for the user."""
    # Write some mock product backlog items
    return [
        {   
            "name": "Implement the frontend with Next.js and Tailwind CSS",
            "id": "1"
        },
        {
            "name": "Implement the backend with FastAPI",
            "id": "2"
        },
        {
            "name": "Implement the database with PostgreSQL",
            "id": "3"
        },
        {
            "name": "Implement the authentication with NextAuth",
            "id": "4"
        },   
    ]

def get_product_backlog_item_details(id: int):
    """Get the details of the product backlog item for the user."""
    # Write some mock product backlog item details
    return [
        {
            "id": "1",
            "details": "Frontend will be built with Next.js and Tailwind CSS. It will be a single page application with a sidebar for navigation."
        },
        {
            "id": "2",
            "details": "Backend will be built with FastAPI. It will be a RESTful API that will be used to store and retrieve data from the database."
        },
        {
            "id": "3",
            "details": "Database will be built with PostgreSQL. It will be used to store and retrieve data from the backend."
        },
        {
            "id": "4",
            "details": "Authentication will be built with NextAuth. It will be used to authenticate the user and provide a secure way to store and retrieve data from the database."
        },
    ]


def create_deployment_ticket():
    """This tool will show the user the deployment ticket form."""
    value = interrupt("What is the deployment ticket details?")
    print(value)
    return "Deployment ticket created successfully"


#def get_user_details():
#    """Get the details of the user by presenting a form"""
#    value = interrupt("What is the user's name and age?")
#    return value

product_backlog_manager = create_react_agent(
    model=model,
    tools=[get_product_backlog_items, get_product_backlog_item_details],
    name="product_backlog_assistant",
    prompt="You are a product backlog assistant. You are responsible for gathering product backlog item lists and getting details about each item."
)

deployment_assistant = create_react_agent(
    model=model,
    tools=[create_deployment_ticket],
    name="deployment_assistant",
    prompt="You are a deployment ticket assistant. You are responsible for helping the user create a deployment ticket."
)

# Create supervisor workflow
workflow = create_supervisor(
    [deployment_assistant, product_backlog_manager],
    model=model,
    prompt=(
        "You are a team supervisor managing a deployment assistant and a product backlog assistant."
        "For product backlog management, use product_backlog_assistant."
        "For deployment ticket creation, use deployment_assistant."
    )
)

# Compile and run
graph = workflow.compile()

graph.name = "Super Agent"