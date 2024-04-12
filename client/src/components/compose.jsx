import { Editor } from "@tinymce/tinymce-react";
import {Controller} from "react-hook-form"; 

function Compose() {
  return (
    <>
      <h1 className="font-Akshar text-4xl font-medium px-10 py-3">Compose</h1>

      <Editor
        apiKey="k864ik6xmkyzxucmb07802uje72hkojca3p3h0mju2rj5c2m"
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
            
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("AI implementation comming..")
            ),
        }}
        initialValue="Implement your thoughts here...."
      />
    </>
  );
}

export default Compose;