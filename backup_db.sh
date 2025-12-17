#!/bin/bash

PROJECT_DIR="$HOME/garage_system"
DB_FILE="$PROJECT_DIR/garage_backend/db.sqlite3"
BACKUP_DIR="$PROJECT_DIR/backups"

mkdir -p "$BACKUP_DIR"

if [ ! -f "$DB_FILE" ]; then
  echo "❌ Database not found at $DB_FILE"
  exit 1
fi

cp "$DB_FILE" "$BACKUP_DIR/db_backup_$(date +%F_%H-%M-%S).sqlite3"

echo "✅ Backup completed successfully"
echo "📁 Saved in: $BACKUP_DIR"

