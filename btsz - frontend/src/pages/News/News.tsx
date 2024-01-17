import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor, EditorState as EditorStateType } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./News.module.scss";
import LL from "../../translations";
import { NewsDetails } from "../../types";
import { deleteNews, getNews, postNews } from "../../api/news/news.api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, RadioGroup } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import IconDelete from "../../assets/icons/iconDelete.svg";
import { stateToHTML } from "draft-js-export-html";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

const News = () => {
  const storedRole = localStorage.getItem("role");
  const isAdmin = storedRole === "admin";
  const [news, setNews] = useState<NewsDetails[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [deleteNewsId, setDeleteNewsId] = useState<number | undefined>(
    undefined,
  );
  const [descriptionHtml, setDescriptionHtml] = useState<string>("");
  const [addNews, setAddNews] = useState<NewsDetails>({
    descriptionHtml: "",
    contentId: 0,
    title: "",
    publishedDate: "",
    coverUrl: "",
    leadText: "",
    isHighlighted: false,
    highlightingColorCode: "#f7b53e",
  });
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const [editorState, setEditorState] = useState<EditorStateType>(
    EditorState.createEmpty(),
  );

  const openEditor = () => {
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
  };

  const fetchNews = async () => {
    try {
      const response = await getNews();
      const sortedNews = response.data.sort((a, b) =>
        b.publishedDate.localeCompare(a.publishedDate),
      );
      setNews(sortedNews);
    } catch (error) {
      console.error("Hiba a hírek lekérése során", error);
    }
  };

  const handleSubmit = async () => {
    addNews.descriptionHtml = descriptionHtml;
    addNews.publishedDate = new Date().toISOString();
    try {
      await postNews(addNews);
      await fetchNews();
      closeEditor();
      setAddNews({
        descriptionHtml: "",
        contentId: 0,
        title: "",
        publishedDate: "",
        coverUrl: "",
        leadText: "",
        isHighlighted: false,
        highlightingColorCode: "#f7b53e",
      });
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 403
      ) {
        setError(true);
      } else {
        console.error("Hiba a hír feltöltése során:", error);
      }
    }
  };

  const handleDeleteNews = async (newsId: number | undefined) => {
    if (newsId !== undefined) {
      try {
        await deleteNews(newsId);
        await fetchNews();
      } catch (error) {
        if (
          isAxiosError(error) &&
          error.response &&
          error.response.status === 403
        ) {
          setError(true);
        } else {
          console.error("Hiba a hír törlése során:", error);
        }
      }
    } else {
      console.error("Érvénytelen newsId: ", newsId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setAddNews((prevNews) => ({
        ...prevNews,
        [name]: value === "true",
      }));
    } else {
      setAddNews((prevNews) => ({
        ...prevNews,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error]);

  const handleEditorChange = (newState: EditorStateType) => {
    setEditorState((prevState) => {
      const content = convertToRaw(newState.getCurrentContent());
      const contentState = convertFromRaw(content);
      setDescriptionHtml(stateToHTML(contentState));

      return newState;
    });
  };

  const formatPublishedDate = (date: string) => {
    const originalDate = new Date(date);

    const formattedDate = originalDate.toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedDate;
  };

  const navigateToNewsDetail = (newsItem: NewsDetails) => {
    navigate(`/hirek/${newsItem.contentId}`, { state: { newsItem } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{LL.news}</div>
      {isAdmin && (
        <div className={styles.buttonContainer}>
          {isEditing ? (
            <button className={styles.button} onClick={closeEditor}>
              {LL.cancel}
            </button>
          ) : (
            <button className={styles.button} onClick={openEditor}>
              {LL.addNews}
            </button>
          )}
        </div>
      )}
      {isEditing && (
        <div className={styles.editorContainer}>
          <form>
            <label htmlFor="title">{LL.newsDetails.title}</label>
            <input
              type="text"
              name="title"
              value={addNews.title}
              onChange={handleChange}
            />
            <label htmlFor="lead">{LL.newsDetails.lead}</label>
            <input
              type="text"
              name="leadText"
              value={addNews.leadText}
              onChange={handleChange}
            />
            <label htmlFor="coverUrl">{LL.newsDetails.coverUrl}</label>
            <input
              type="url"
              name="coverUrl"
              id="coverUrl"
              onChange={handleChange}
            />
            <label htmlFor="description">{LL.newsDetails.description}</label>
            <div className={styles.richTextContainer}>
              <Editor
                editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={handleEditorChange}
              />
            </div>
            <label htmlFor="isHighlighted">
              {LL.newsDetails.isHighlighted}
            </label>
            <RadioGroup
              id="roleGroup"
              name="roleGroup"
              value={addNews.isHighlighted}
            >
              <div className={styles.radioContainer}>
                <div>
                  <input
                    type="radio"
                    id="isHighlightedFalse"
                    name="isHighlighted"
                    value="false"
                    onChange={handleChange}
                    checked={addNews.isHighlighted === false}
                  />
                  <label htmlFor="isHighlightedFalse">{LL.no}</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="isHighlightedTrue"
                    name="isHighlighted"
                    value="true"
                    onChange={handleChange}
                    checked={addNews.isHighlighted === true}
                  />
                  <label htmlFor="isHighlightedTrue">{LL.yes}</label>
                </div>
              </div>
            </RadioGroup>
          </form>
          <div className={styles.submitContainer}>
            <button
              className={styles.button}
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              {LL.teamManagement.submit}
            </button>
          </div>
        </div>
      )}
      <div className={styles.newsCardContainer}>
        {news.map((news) => (
          <Card
            className={`${styles.newsCard} ${
              news.isHighlighted ? styles.highlighted : ""
            }`}
            sx={{ maxWidth: 345 }}
            key={news.contentId}
            onClick={() => navigateToNewsDetail(news)}
          >
            <CardActionArea>
              <CardMedia component="img" height="140" image={news.coverUrl} />
              <CardContent style={{ height: "fit-content" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {news.title}
                </Typography>
                <Typography
                  style={{ height: "72px", overflowY: "auto" }}
                  variant="body2"
                  color="text.secondary"
                >
                  {news.leadText}
                </Typography>
                <Typography
                  className={styles.deleteContainer}
                  variant="body2"
                  color="primary"
                >
                  {formatPublishedDate(news.publishedDate)}
                  {isAdmin && (
                    <button
                      className={styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAlert(true);
                        setDeleteNewsId(news.contentId);
                      }}
                    >
                      <img src={IconDelete} />
                    </button>
                  )}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <Modal
        open={showAlert}
        submitText={LL.delete}
        cancelText={LL.cancel}
        onClose={() => setShowAlert(false)}
        onCancel={() => setShowAlert(false)}
        onSubmit={() => {
          handleDeleteNews(deleteNewsId);
          setShowAlert(false);
          setDeleteNewsId(undefined);
        }}
      >
        <p>{LL.deleteNews}</p>
      </Modal>
    </div>
  );
};

export default News;
