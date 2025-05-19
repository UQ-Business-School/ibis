
function setupTinyMCE(selector, initialContent, onChangeCallback) {
  tinymce.init({
    license_key: 'gpl',
    selector: selector,
    plugins: [
      'anchor', 'accordion', 'autolink', 'autoresize', 'charmap', 'code', 'codesample',
      'help', 'emoticons', 'fullscreen', 'image', 'importcss', 'link', 'lists', 'advlist',
      'media', 'pagebreak', 'preview', 'quickbars', 'save', 'searchreplace', 'table',
      'visualblocks', 'wordcount'
    ],
    /*— 2) Classic menubar —*/
    menubar: 'file edit view insert format tools table help',

    /*— 3) Six ribbon-style toolbar rows —*/
    toolbar1: [ //done
      'undo redo',
      'cut copy paste pastetext pasteword selectall',
      'wordcount preview fullscreen help',
      'save code'
    ].join(' | '),

    toolbar2: [ //done
      'blocks fontfamily fontsize',
      'bold italic underline strikethrough',
      'subscript superscript removeformat',
      'backcolor forecolor'
    ].join(' | '),

    toolbar3: [ //done
      'link image media table pagebreak',
      'bullist numlist checklist indent outdent blockquote',
      'alignleft aligncenter alignright alignjustify lineheight',
      'codesample charmap emoticons anchor'
    ].join(' | '),
    
    /*- 4) Define fonts and formatting -*/
    content_css: [
      'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
    ],
    font_family_formats: 'Atkinson Hyperlegible=Atkinson Hyperlegible, sans-serif; Arial=Arial, Helvetica, sans-serif; Merriweather=Merriweather, serif; Montserrat=Montserrat, sans-serif; Open Sans=Open Sans, sans-serif; Roboto=Roboto, sans-serif; Atkinson Hyperlegible=Atkinson Hyperlegible, sans-serif;',
    content_style: 'body { font-family: "Open Sans", sans-serif; font-size: 0.875rem; } p { margin: 0; }',
    block_formats: 'Title=h4;Heading=h5;Subheading=h6;Paragraph=p',

    // - Custom in-text toolbars; Visual blocks - //
    quickbars_selection_toolbar: 'bold italic | blocks | quicklink forecolor blockquote | alignleft aligncenter alignright alignjustify',
    quickbars_insert_toolbar: 'quickimage quicktable media codesample',
    visualblocks_default_state: false,

    // - Color Maping to UQ brand, and number of color columns -//
    color_map: [
      '#51247A', 'UQ Purple, #51247A',
      '#000000', 'UQ Black, #000000',
      '#FFFFFF', 'UQ White, #FFFFFF',
      '#2EA836', 'UQ Green, #2EA836',
      '#E62645', 'UQ Red, #E62645',
      '#962A8B', 'UQ Light Purple, #962A8B',
      '#1F0029', 'UQ Dark Purple, #1F0029',
      '#BB9D65', 'UQ Gold, #BB9D65',
      '#FBB800', 'UQ Yellow, #FBB800',
      '#EB602B', 'UQ Orange, #EB602B',
      '#4085C6', 'UQ Blue, #4085C6',
      '#00A2C7', 'UQ Aqua, #00A2C7',
      '#D7D1CC', 'UQ Neutral, #D7D1CC',
      '#F7F6F5', 'UQ Neutral20, #F7F6F5',
      '#EFECEA', 'UQ Neutral40, #EFECEA',
      '#E7E3E0', 'UQ Neutral60, #E7E3E0',
      '#DFDAD6', 'UQ Neutral80, #DFDAD6',
      '#999490', 'UQ Dark Grey, #999490',
      '#EBE8E7', 'UQ Dark Grey20, #EBE8E7',
      '#D8D2D0', 'UQ Dark Grey40, #D8D2D0',
      '#C4BDBA', 'UQ Dark Grey60, #C4BDBA',
      '#B1A8A4', 'UQ Dark Grey80, #B1A8A4',
      '#262626', 'Blackboard Default, #262626',
      '#2075A3', 'Blackboard Link, #2075A3',
      '#666666', 'Blackboard Grey, #666666',
      '#A234B5', 'Blackboard Purple, #A234B5',
      '#046EF6', 'Blackboard Blue, #046EF6',
      '#1C8845', 'Blackboard Green, #1C8845',
      '#E72218', 'Blackboard Red, #E72218',
      '#F8F8F8', 'Blackboard Table Heading, #F8F8F8'
    ],
    color_cols: 6,

    // Advanced features that are not currently enabled //
    advlist_bullet_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' }
    ],

    // Height minimums for the text editor; make it resizeable - be sure to add 'autoresize' as a plugin! //
    height: 400,            // starting height
    min_height: 300,        // never shrink below 200px
    resize: true,           // allow manual resize (default unless autoresize is enabled)
    // optional: control the auto-resize bounds
    autoresize_min_height: 300,
    autoresize_max_height: 800,

    // Save functionality - enable download
    save_enablewhendirty: false, // set to true (default) to disable button until only when modifications have been made
    save_onsavecallback: function (editor){
      const html = editor.getContent({ format: 'html'});
      const blob = new Blob([html], {type: 'text/html'});
      const url  = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href    = url;
      a.download  = 'SavedContent.html';
      document.body.appendChild(a);
      a.click();

      // Cleanup
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return false;
    },
    // Save functionality - intercept and prevent form submission event
    

    // Make it all work //
    setup: function(editor) {
      editor.on('init', function() {
        // 1) set the intial content
        editor.setContent(initialContent);

        // 2) Save functionality prevent the parent form from submitting
        const textarea = editor.getElement();
        const form = textarea.closest('form');
        if (form) {
          form.addEventListener('submit', e => e.preventDefault());
        }
        });

        // 3) fire your onChangeCallback on every change/keyup
        editor.on('change keyup', function() {
          onChangeCallback(editor.getContent());
        });
      }
  });
}
