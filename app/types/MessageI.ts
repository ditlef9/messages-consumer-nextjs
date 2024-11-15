interface MessageI {
    msg_id: number;
    msg_platform: string;
    msg_external_id: string;
    msg_created_at: string;
    msg_language: string;
    msg_url: string;
    msg_content: string;
    msg_external_account_id: string;
    attachments: AttachmentI[];
  }
  