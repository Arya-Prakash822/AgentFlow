from fastapi import FastAPI

from api.auth import router as auth_router

app = FastAPI(title="AgentFlow")
app.include_router(auth_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
