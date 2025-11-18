import { useState, useRef } from 'react';
import { Save, Eye, Code, Download } from 'lucide-react';

export default function TinyMCEEditor() {
    const [content, setContent] = useState('<p>Start typing your content here...</p>');
    const [showPreview, setShowPreview] = useState(false);
    const [showHTML, setShowHTML] = useState(false);
    const editorRef = useRef(null);

    const handleSave = () => {
        alert('Content saved!\n\nIn a real application, this would save to your backend.');
        console.log('Saved content:', content);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-lg shadow-lg p-3 border-b border-slate-200">
                    <h1 className="text-2xl font-bold text-slate-800">TinyMCE Rich Text Editor</h1>
                    <p className="text-slate-600 text-sm">Create beautifully formatted content with ease</p>
                </div>

                {/* Toolbar */}
                <div className="bg-white shadow-lg p-2 border-b border-slate-200 flex gap-1 flex-wrap">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                        <Save size={16} />
                        Save
                    </button>
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                    >
                        <Eye size={16} />
                        {showPreview ? 'Hide' : 'Show'} Preview
                    </button>
                    <button
                        onClick={() => setShowHTML(!showHTML)}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                    >
                        <Code size={16} />
                        {showHTML ? 'Hide' : 'Show'} HTML
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors text-sm"
                    >
                        <Download size={16} />
                        Download
                    </button>
                </div>

                {/* Editor */}
                <div className="bg-white shadow-lg p-3">
                    <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <EditorToolbar />
                        <div
                            ref={editorRef}
                            contentEditable
                            className="min-h-[300px] p-2 focus:outline-none prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: content }}
                            onInput={(e) => setContent(e.currentTarget.innerHTML)}
                            style={{
                                fontFamily: 'Georgia, serif',
                                fontSize: '15px',
                                lineHeight: '1.5',
                            }}
                        />
                    </div>
                </div>

                {/* Preview Section */}
                {showPreview && (
                    <div className="bg-white shadow-lg rounded-b-lg p-3">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Eye size={18} />
                            Preview
                        </h2>
                        <div
                            className="border border-slate-300 rounded p-2 prose max-w-none bg-slate-50"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                )}

                {/* HTML View */}
                {showHTML && (
                    <div className="bg-white shadow-lg rounded-b-lg p-3">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Code size={18} />
                            HTML Source
                        </h2>
                        <pre className="bg-slate-900 text-green-400 p-2 rounded overflow-x-auto text-xs">
              <code>{content}</code>
            </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

function EditorToolbar() {
    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const toolbarButtons = [
        { command: 'bold', label: 'B', title: 'Bold', style: 'font-bold' },
        { command: 'italic', label: 'I', title: 'Italic', style: 'italic' },
        { command: 'underline', label: 'U', title: 'Underline', style: 'underline' },
        { command: 'strikeThrough', label: 'S', title: 'Strikethrough', style: 'line-through' },
    ];

    const alignButtons = [
        { command: 'justifyLeft', label: '⬅', title: 'Align Left' },
        { command: 'justifyCenter', label: '↔', title: 'Align Center' },
        { command: 'justifyRight', label: '➡', title: 'Align Right' },
        { command: 'justifyFull', label: '⬌', title: 'Justify' },
    ];

    const listButtons = [
        { command: 'insertUnorderedList', label: '• List', title: 'Bullet List' },
        { command: 'insertOrderedList', label: '1. List', title: 'Numbered List' },
    ];

    return (
        <div className="bg-slate-100 border-b border-slate-300 p-1 flex flex-wrap gap-1">
            {/* Format Dropdown */}
            <select
                onChange={(e) => execCommand('formatBlock', e.target.value)}
                className="px-2 py-1 border border-slate-300 rounded bg-white text-xs"
                defaultValue="p"
            >
                <option value="p">Paragraph</option>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
            </select>

            {/* Text Style Buttons */}
            {toolbarButtons.map((btn) => (
                <button
                    key={btn.command}
                    onClick={() => execCommand(btn.command)}
                    className={`px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-200 transition-colors text-xs ${btn.style}`}
                    title={btn.title}
                >
                    {btn.label}
                </button>
            ))}

            {/* Alignment Buttons */}
            {alignButtons.map((btn) => (
                <button
                    key={btn.command}
                    onClick={() => execCommand(btn.command)}
                    className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-200 transition-colors text-xs"
                    title={btn.title}
                >
                    {btn.label}
                </button>
            ))}

            {/* List Buttons */}
            {listButtons.map((btn) => (
                <button
                    key={btn.command}
                    onClick={() => execCommand(btn.command)}
                    className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-200 transition-colors text-xs"
                    title={btn.title}
                >
                    {btn.label}
                </button>
            ))}

            {/* Additional Tools */}
            <button
                onClick={() => {
                    const url = prompt('Enter link URL:');
                    if (url) execCommand('createLink', url);
                }}
                className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-200 transition-colors text-xs"
                title="Insert Link"
            >
                🔗
            </button>

            <button
                onClick={() => execCommand('removeFormat')}
                className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-200 transition-colors text-xs"
                title="Clear Formatting"
            >
                ✕
            </button>
        </div>
    );
}
